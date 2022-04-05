const mongoose = require('mongoose');

const ROLE_ADMIN = 'ROLE_ADMIN';
const ROLE_USER = 'ROLE_USER';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, default: ROLE_USER },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

exports = {
  ROLE_ADMIN,
  ROLE_USER,
};
