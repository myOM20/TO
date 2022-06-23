const mongoose = require('mongoose');
const Schema = mongoose.Schema;

userSchema = new Schema({
  unique_id: Number,
  email: String,
  username: String,
  NumberPhone :Number,
  password: String,
  passwordConf: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
