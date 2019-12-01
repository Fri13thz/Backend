const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
  displayName: { type: String },
  facebookId: { type: String, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  age: { type: String },
  tel: { type: String },
  photos: { type: String },
  gender: {type: String, enum: ['Male', 'Female'], default: 'Male'},
})

module.exports = mongoose.model('profile', profileSchema)
