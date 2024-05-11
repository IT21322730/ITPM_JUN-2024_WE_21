const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to handle user registration
router.post('/register', async (req, res) => {
    const { username, securityQuestion, securityAnswer } = req.body;

    try {
        const newUser = new User({
          username,
          securityQuestion,
          securityAnswer,
          role: 'user' // Assign role
        });
        await newUser.save();


        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Failed to register user:', error);
        res.status(500).json({ error: 'An error occurred during registration' });
    }
});

// Route to handle user authentication
router.post('/authenticate', async (req, res) => {
    const { username, securityAnswer  } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.securityAnswer !== securityAnswer ) {
            return res.status(401).json({ error: 'Incorrect answer to security question' });
        }

        res.json({ message: 'Authentication successful', user });
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: 'An error occurred during authentication' });
    }
});

// Route to handle updating user's security question and answer
router.put('/update-user', async (req, res) => {
    const { username, securityQuestion, securityAnswer } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { username },
            { securityQuestion: securityQuestion, securityAnswer: securityAnswer },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'Security question and answer updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating security question and answer:', error);
        res.status(500).json({ error: 'An error occurred during update' });
    }
});

// Route to handle viewing all users
router.get('/', async (req, res) => {
    try {
        // Retrieve all users from the database
        const users = await User.find();

        // Check if any users are found
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        // Return the list of users
        res.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'An error occurred while fetching users' });
    }
});


module.exports = router;
