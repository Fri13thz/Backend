const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require("email-validator");


const profileSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  age: { type: String },
  tel: { type: Number },
  gender: { type: Boolean },
});

module.exports = mongoose.model('profile', profileSchema)
