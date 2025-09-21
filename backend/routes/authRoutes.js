// routes/authRoutes.js
import express from 'express';
import {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  updatePassword
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', login);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', protect, logout);

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', protect, getMe);

// @route   PUT /api/auth/updateprofile
// @desc    Update user profile
// @access  Private
router.put('/updateprofile', protect, updateProfile);

// @route   PUT /api/auth/updatepassword
// @desc    Update password
// @access  Private
router.put('/updatepassword', protect, updatePassword);

export default router;