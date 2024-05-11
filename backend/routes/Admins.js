const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

// Admin registration route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if admin with the same username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = new Admin({
      username,
      password: hashedPassword
    });

    // Save the admin to the database
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).json({ message: 'An error occurred while registering admin' });
  }
});

// Admin login route
router.post('/authenticate', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

// Update admin password route
router.put('/update-password', async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  try {
    // Find the admin by username
    const admin = await Admin.findOne({ username });

    // Check if the admin exists
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Check if the new password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the admin's password
    admin.password = hashedPassword;

    // Save the updated admin to the database
    await admin.save();

    res.status(200).json({ message: 'Admin password updated successfully' });
  } catch (error) {
    console.error('Error updating admin password:', error);
    res.status(500).json({ message: 'An error occurred while updating admin password' });
  }
});

module.exports = router;
