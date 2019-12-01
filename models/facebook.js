const mongoose = require('mongoose')
const Schema = mongoose.Schema

const facebookSchema = new Schema({
  facebookId: { type: String, unique: true },
  displayName: { type: String },
  photos: { type: String },
  profile: { type: Schema.Types.ObjectId , ref: 'profile' }
});

module.exports = mongoose.model('facebook', facebookSchema)
