const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler'); // Need to install this or use try-catch
const User = require('../models/userModel');
const { validationResult } = require('express-validator');

// Generate JWT
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    // Validation check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

  const { username, email, password } = req.body;

  try {
      const userExists = await User.findOne({ $or: [{ email }, { username }] });

      if (userExists) {
        res.status(400);
        throw new Error('User already exists');
      }

      const user = await User.create({
        username,
        email,
        password,
      });

      if (user) {
        generateToken(res, user._id);
        res.status(201).json({
          _id: user._id,
          username: user.username,
          email: user.email,
        });
      } else {
        res.status(400);
        throw new Error('Invalid user data');
      }
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });

      if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
        });
      } else {
        res.status(401);
        throw new Error('Invalid email or password');
      }
  } catch (error) {
       res.status(401).json({ message: error.message });
  }
};

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'User logged out' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  };

  res.status(200).json(user);
};

module.exports = {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
};

