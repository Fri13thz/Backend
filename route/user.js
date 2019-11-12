const express = require('express')
const router = express.Router()

const user = require('../controller/user/user')


router.get('/findprofile', user)
router.post('/signUp',user.signUp)
router.post('/signIn',user.signIn)
router.post('/update',user.update)

module.exports = router

