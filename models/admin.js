const mongoose = require('mongoose');
const Schema = mongoose.Schema;

adminSchema = new Schema({
  unique_idAdmin : Number,
  email: String,
  username: String,
  password: String,
  passwordConf: String,
  NumberPhone : Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Admin = mongoose.model('Admin', userSchema);

module.exports = Admin;
