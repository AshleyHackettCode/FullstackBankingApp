const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Route to handle user signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the email already exists in the database
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'Email already exists. Please use a different email.' });
  }

  try {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user using the User model
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      balance: 100,
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: 'Account created successfully!' });
  } catch (error) {
    // Handle any errors that occurred during the signup process
    console.error('Error creating account:', error);
    res.status(500).json({ error: 'Error creating account. Please try again later.' });
  }
});

module.exports = router;
