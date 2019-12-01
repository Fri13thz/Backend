const user = require('./user')
const profile = require('./profile')
const facebook = require('../services/auth/facebook')

module.exports = (app) => {
  app.use('/user', user)
  app.use('/profile', profile)
  app.use(facebook)
}