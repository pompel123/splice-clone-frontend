const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Assuming a User model is created with Mongoose

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ success: false, message: 'User already exists' });

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save the new user
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ success: true, user: { email: newUser.email } });
});

module.exports = router;
