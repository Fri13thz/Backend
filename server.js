const session = require('express-session')
const app = require('./config/express')
// const app = express()
const mongoose = require('./config/mongoose')
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const path = require('path')
const router = require('./route')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

// app.use(cors())

const PORT = process.env.PORT || 9000

mongoose.connect()

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }),
)

// app.use(passport.initialize())
// app.use(passport.session())

passport.serializeUser(function(user, done) {
  done(null, user) //อยากส่งอะไรไปเก็บใน session
})
passport.deserializeUser(function(obj, done) {
  done(null, obj) //เอาของที่เก็บใน session มาใช้ต่อ
})

passport.use(
  new FacebookStrategy(
    {
      clientID: '461447364511670',
      clientSecret: '0f8426f7e38e39a7b70c4f0cc5513215',
      callbackURL: 'http://localhost:8080/profile',
    },
    function(accessToken, refreshToken, profile, done) {
      console.log('profile :', profile)
      //ส่วนนี้จะเอาข้อมูลที่ได้จาก facebook ไปทำอะไรต่อก็ได้
      done(null, profile) //เสร็จแล้วให้เรียกฟังก์ชั่นนี้
    },
  ),
)

app.get('/', (req, res) => {
  res.send('please login')
})
app.get('/auth/facebook', passport.authenticate('facebook'))
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/',
  }),
)
app.get('/profile', (req, res) => {
  console.log(req.user)
  res.json(req.user)
})

// express.static(path.join(__dirname, '/public'))

app.listen(PORT, () => {
  console.log(`Server running on port =  ${PORT}`)
})

router(app)



module.exports.app
