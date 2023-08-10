const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  recentlyVisited: {
    type: [String], // Array of strings to store visited item names
    default: [],    // Default to an empty array
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;