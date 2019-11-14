const express = require ('express')
const router = express.Router()
const profile = require('../controller/user/profile')
const verifyToken = require('../middlewares/jwt')


router.post('/update',verifyToken,profile.update)

module.exports = router