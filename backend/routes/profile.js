const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (profile) {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, { new: true, runValidators: true });
    } else {
      profile = await Profile.create(req.body);
    }
    res.json({ success: true, data: profile });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
