const profile = require('../../models/profile')
const jwt = require('jsonwebtoken')

module.exports.update = (req, res) => {
  jwt.verify(req.token, 'secretkey', async (err, authData) => {
    let update = await profile.findOneAndUpdate({ username: req.body.username },
      { $set: { firstName: req.body.firstName } },
    )
    if (update) {
      res.send({ status: { message: 'Updating' }})
    } else {
      res.send({ status: { message: 'Failed' } })
    }
  })
}
