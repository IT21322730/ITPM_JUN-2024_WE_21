const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  securityQuestion: {
    type: String,
    required: true
  },
  securityAnswer: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user' // Default role is user
  }
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);

 