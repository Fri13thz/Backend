const profile = require('../../models/profile')

module.exports.update = async (req, res) => {
  let update = await profile.findOneAndUpdate({ username: req.body.username },
    { $set: { firstName: '123123123' } }
  )
  if (update) {
    res.send({ status: { message: 'Updating' } })
  } else {
    res.send({ status: { message: 'Failed' } })
  }
}