const user = require('../../models/user')
const profile = require('../../models/profile')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
  user
    .findOne()
    .populate({
      path: 'profile',
      select: 'firstName',
    })
    .select('username')
    .exec((err, resp) => {
      if (err) {
        console.log('err', err)
        res.send(err)
      } else {
        console.log('res', resp)
        res.send(resp)
      }
    })
}

module.exports.signIn = async (req, res) => {
  let data = await user.findOne({
    username: req.body.username,
    password: req.body.password,
  })

  jwt.sign({ data }, 'secretkey', { expiresIn: '1h' }, (err, token) => {
    if (data) {
      profile.findOne({ username: data.username })
      res.send({
        status: { code: 1, detail: data, token: token },
      })
    } else {
      res.send({
        status: { code: 0, message: 'Username or Password is Wrong' },
      })
    }
  })
}

module.exports.signUp = (req, res) => {
  let Profile = new profile({
    username: req.body.username,
    password: req.body.password,
    firstName: '',
    lastName: '',
    age: '',
  })
  let User = new user({
    username: req.body.username,
    password: req.body.password,
    profile: Profile.id,
  })

  Profile.save(err => {
    if (err) {
      if (err.code === 11000) {
        res.send({ status: { code: 0, message: 'Username already exist'} })
      }
    }
    User.save()
    jwt.sign({ User }, 'secretkey', { expiresIn: '1h' }, (err, token) => {
      res.send({ status: { code: 1, message: 'Successful', token: token } })
      res.json('saved')
    })
  })
}

module.exports.signOut = (req, res) => {
  res.send({ status: { code: 1, message: 'Successful' } })
}
