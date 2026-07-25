const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Certificate = require('../models/Certificate');
const Achievement = require('../models/Achievement');
const Education = require('../models/Education');
const Training = require('../models/Training');

// @route   GET /api/portfolio/all
// @desc    Get all portfolio data in one request
// @access  Public
router.get('/all', async (req, res) => {
  try {
    const [profile, skills, projects, experience, certificates, achievements, education, training] = await Promise.all([
      Profile.findOne(),
      Skill.find().sort({ order: 1, name: 1 }),
      Project.find().sort({ order: 1, createdAt: -1 }),
      Experience.find().sort({ order: 1 }),
      Certificate.find().sort({ order: 1 }),
      Achievement.find().sort({ order: 1 }),
      Education.find().sort({ order: 1 }),
      Training.find().sort({ order: 1 })
    ]);

    res.json({
      success: true,
      data: { profile, skills, projects, experience, certificates, achievements, education, training }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
