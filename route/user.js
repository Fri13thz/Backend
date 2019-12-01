const express = require('express')
const router = express.Router()
const user = require('../controller/user/user')
const verifyToken = require('../middlewares/jwt')


router.get('/findprofile', user)
router.post('/signUp',user.signUp)
router.post('/signIn',user.signIn)
router.post('/signOut',user.signOut)

module.exports = router

