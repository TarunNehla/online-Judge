// routes.js
const express = require('express');
const User = require('./userModel').User;
const Plist = require('./userModel').Plist;
const Submission = require('./userModel').Submission;
const router = express.Router();
const generateCodeFile = require('./generateFile');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
require('dotenv').config();
const executeFile = require('./execute');
const mongoose = require('mongoose');

router.post('/register', async (req, res) => {
    const {
        registerName,
        registerEmail,
        registerPassword
      } = req.body;
      if (!registerName || !registerEmail || !registerPassword) {
        return res.status(400).json({
          message: 'All fields are required.'
        });
      }
    
      try {
        // Check if the email is already registered
        const existingUser = await User.findOne({
          registerEmail
        });
    
        if (existingUser) {
          return res.status(409).json({
            message: 'Email is already registered.'
          });
        }
        
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(registerPassword,saltRounds)
        // Create a new user document and save it to the database
        const newUser = new User({
          registerName,
          registerEmail,
          passwordHash,
        });
        await newUser.save();
    
        return res.status(201).json({
          message: 'User registered successfully.'
        });
      } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({
          message: 'Internal server error.'
        });
      }
});

router.post('/login', async (req, res) => {
    const { loginEmail, loginPassword } = req.body;
    if (!loginEmail || !loginPassword) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
  
    try {
      // Find the user document with the matching email
      const user = await User.findOne({ registerEmail: loginEmail });
      const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(loginPassword, user.passwordHash)
      // Check if the password matches the one stored in the database
      if (!(user && passwordCorrect)) {
        return response.status(401).json({
          error: 'invalid username or password'
        })
      }
      // In a real application, you might use a JWT (JSON Web Token) for authentication and send it back as a response.
      const userForToken = {
        username: user.registerEmail,
        id: user._id,
      }
      
      const token = jwt.sign(userForToken, process.env.SECRET)
      res.status(200).send({ token,userId : user._id, userMail: user.registerEmail, name: user.registerName, message: 'Login successful.' })
    } catch (error) {
      console.error('Error logging in user:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
});

router.get('/api/plist', async (req, res) => {
  try {
    // Fetch all documents from the 'plist' collection
    const data = await Plist.find();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from the database:', error);

    // Send a detailed error response with status code 500 and error message
    res.status(500).json({ error: 'Error fetching data from the database', details: error.message });
  }
})


router.get('/api/submissions/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }
    const objectId = new mongoose.Types.ObjectId(userId);
    const submissions = await Submission.aggregate([
      { $match: { userId: objectId } },
      { $sort: { submissionTime: -1 } },
      {
        $group: {
          _id: "$problemId",
          submissionId: { $first: "$_id" },
          result: { $first: "$result" },
          submissionTime: { $first: "$submissionTime" }
        }
      }
    ]);

    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions from the database:', error);
    res.status(500).json({ error: 'Error fetching submissions from the database', details: error.message });
  }
});


router.post('/generateCodeFile', async (req, res, next) => {
  try {
    const {token, problemId, language, code } = req.body;
    const decoded = jwt.verify(token, process.env.SECRET);
    const filePath = await generateCodeFile(problemId, language, code);
    const output = await executeFile(filePath.path, problemId); // Assuming executeFile is also an async function
    console.log(output);
    const result = output.success ? 'correct' : 'incorrect';
    const user = await User.findOne({ registerEmail: decoded.username});
    const newSubmission = new Submission({
      userId: user._id,
      problemId: problemId,
      result: result
    });
    await newSubmission.save();
    res.status(200).json({
      message: 'Submission result saved successfully.',
      submissionId: newSubmission._id,
      output: output 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error saving submission result.', error: error });
  }
});


module.exports = router;
