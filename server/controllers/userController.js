const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc Authenticate user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please enter all fields.');
  }

  // Check for user email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      balance: user.balance,
      account: user.account,
      admin: user.admin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user credentials');
  }
});

// @desc Create new user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
  const { name, email, password, account } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please enter all fields.');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('That email is already in use. Please log in.');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    account,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      balance: user.balance,
      account: user.account,
      admin: user.admin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user credentials');
  }
});

// @desc Deposit money
// @route POST /api/deposit
// @access Private
const deposit = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    res.status(400);
    throw new Error('Please enter a valid deposit amount');
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.balance += Number(amount);
  await user.save();

  res.status(200).json({ message: 'Deposit successful', newBalance: user.balance });
});

// @desc Withdraw money
// @route POST /api/withdraw
// @access Private
const withdraw = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    res.status(400);
    throw new Error('Please enter a valid withdraw amount');
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.balance < Number(amount)) {
    res.status(400);
    throw new Error('Insufficient balance for withdrawal');
  }

  user.balance -= Number(amount);
  await user.save();

  res.status(200).json({ message: 'Withdrawal successful', newBalance: user.balance });
});

// @desc Get all users
// @route GET /api/users
// @access Private (Admin only)
const getAllUsers = asyncHandler(async (req, res) => {
  if (!req.user.admin) {
    res.status(401);
    throw new Error('Not authorized to view all users');
  }

  const users = await User.find({}).select('-password');
  res.status(200).json({ users });
});

// Generate JWT
const generateToken = (id, secretKey) => {
  return jwt.sign({ id }, secretKey, {
    
  });
};

module.exports = { loginUser, registerUser, deposit, withdraw, getAllUsers };
