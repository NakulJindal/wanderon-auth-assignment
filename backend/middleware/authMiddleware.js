const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      res.status(401);
      res.json({ message: 'Not authorized, token failed' });
      // throw new Error('Not authorized, token failed'); // Better to return JSON directly in middleware to avoid crash if error handler not perfect
    }
  } else {
    res.status(401);
     res.json({ message: 'Not authorized, no token' });
    // throw new Error('Not authorized, no token');
  }
};

module.exports = { protect };

