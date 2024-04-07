// userModel.js
const mongoose = require('mongoose');

// Define the schema for the user collection
const userSchema = new mongoose.Schema({
  registerName: String,
  registerEmail: String,
  passwordHash: String,
});

const PlistSchema = new mongoose.Schema({
  pname: String,
  pdis: String,
});

const SubmissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plist',
    required: true
  },
  result: {
    type: String,
    enum: ['correct', 'incorrect'],
    required: true
  },
  submissionTime: {
    type: Date,
    default: Date.now
  }
});

const Plist = mongoose.model('plist', PlistSchema);

// Create a model for the user collection
const User = mongoose.model('User', userSchema);
const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = { User, Plist, Submission};
