const profile = require('../../models/profile')
const jwt = require('jsonwebtoken')
// const validator = require("email-validator")



module.exports.update = (req, res) => {
  jwt.verify(req.token, 'Fri13th', async (err) => {
    if (err) {
      res.send({ status: { message: 'Failed' } })
    } else {
      let update = await profile.findOneAndUpdate({ username: '12123' }, { $set: { firstName: 'Nthng' } })
      if (update) {
        res.send({ status: { message: 'Updating' } })
      } else {
        res.send({ status: { message: 'Username is undefine' } })
      }
    }
  })
}