const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/User'

exports.connect = () => {
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  return mongoose.connection
}
