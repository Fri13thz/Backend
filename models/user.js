const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true
  },

  password: {
    type: String,
    trim: true,
  },
  profile: { type: Schema.Types.ObjectId , ref: 'profile' }
});



module.exports = mongoose.model('User', userSchema)


