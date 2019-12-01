const app = require('./config/express')
const mongoose = require('./config/mongoose')
const router = require('./route')
const PORT = process.env.PORT || 9000


const verifyToken = require('./middlewares/jwt')


mongoose.connect()

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`)
})

router(app)



app.post('/api/posts', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});


module.exports = app
