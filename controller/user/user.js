const user = require('../../models/user')
const profile = require('../../models/profile')

module.exports = (req, res) => {
  user
    .findOne()
    .populate({
      path: 'profile',
      select: {}
    })
    .exec((err, resp) => {
      if (err) {
        console.log('err', err)
        res.send(err)
      }
      else {
        console.log('res', resp)
        res.send(resp)
      }
    })
}

module.exports.signIn = async (req, res) => {
  let data = await user.findOne({ username: req.body.username, password: req.body.password })
  if (data) {
    res.send({ status: { code: 0, message: 'Login Successful' } })
  } else {
    res.send({ status: { code: 1, message: 'Login Failed' } })

  }
}


module.exports.signUp = (req, res) => {
  let Profile = new profile({
    username: req.body.username,
    password: req.body.password,
    firstName: '',
    lastName: '',
    age: ''
  })
  let User = new user({
    username: req.body.username,
    password: req.body.password,
    profile: Profile.id
  })

  Profile.save()
  User.save()
    .then(res.status(200).send('saved!!!'))
}


module.exports.update = async (req, res) => {
  let update = await user.findOneAndUpdate({ username: req.body.username })
  console.log('update :', update);
  if (update) {
    res.send(firstName = '1234')
  } else {
    res.send({ status: { code: 1, message: 'failed' } })
  }
}
