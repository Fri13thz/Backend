const user = require('./user')
const profile = require('./profile')


module.exports = (app) => {
  app.use('/user', user)
  app.use('/profile', profile)
  
}