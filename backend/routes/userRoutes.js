const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');
const { check } = require('express-validator');

router.post(
  '/register',
  authLimiter,
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  registerUser
);

router.post('/auth', authLimiter, authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile);

module.exports = router;

