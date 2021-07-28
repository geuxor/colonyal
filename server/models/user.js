// const mongoose = require('./index.js');
// const Pool = require('pg').Pool

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  email_active: { default: false },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
