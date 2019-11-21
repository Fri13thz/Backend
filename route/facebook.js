const express = require ('express')
const router = express.Router()
const facebook = require('../controller/facebook/facebook')



router.get('/',facebook.signIn)
passport.authenticate('facebook')



module.exports = router