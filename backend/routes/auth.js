const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route   POST /api/auth/login
// @desc    Admin login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (email !== adminEmail) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = password === adminPassword;
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const payload = { email, role: 'admin' };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });

    res.json({ success: true, token, admin: { email, role: 'admin' } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/auth/verify
// @desc    Verify token
// @access  Private
router.get('/verify', require('../middleware/auth'), (req, res) => {
  res.json({ success: true, admin: req.admin });
});

module.exports = router;
