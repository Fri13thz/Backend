const express = require('express')
const app = express()
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const userModel = require('../../models/user')
const profile = require('../../models/profile')

app.use(session({ secret: 'secretkey', resave: true, saveUninitialized: true }))

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
      callbackURL: '/auth/facebook/callback',
      enableProof: true,
      profileFields: ['id', 'displayName', 'photos', 'email'],
    },
    function(accessToken, refreshToken, user, done) {
      process.nextTick(function() {
        userModel.findOne({ facebookId: user._json.id }).then(userFacebook => {
            if (userFacebook) {
              done(null, user)
            } else {
              let newProfile = new profile({
                facebookId: user._json.id,
                displayName: user._json.name,
                photos: user._json.picture.data.url,
                firstName: '',
                lastName: '',
                age: '',
              })
              let newUser = new userModel({
                facebookId: user._json.id,
                displayName: user._json.name,
                profile: newProfile.id,
              })
              newProfile.save()
              newUser.save()
              done(null, user)
            }
        })
      })
    },
  ),
)

app.get('/auth/facebook', passport.authenticate('facebook')),
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: 'http://localhost:8080/profile',  
      failureRedirect: '/failed',
    })
  )

module.exports = app
