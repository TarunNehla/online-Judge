// userModel.js
const mongoose = require('mongoose');

// Define the schema for the user collection
const userSchema = new mongoose.Schema({
  registerName: String,
  registerEmail: String,
  registerPassword: String,
});

const PlistSchema = new mongoose.Schema({
  pname: String,
  pdis: String,
});

const Plist = mongoose.model('plist', PlistSchema);

// Create a model for the user collection
const User = mongoose.model('User', userSchema);

module.exports = { User, Plist };
