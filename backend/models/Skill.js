const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String }, // SVG string or URL
  icon_color: { type: String, default: '#61DAFB' },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'database', 'tools', 'languages', 'ai_ml', 'devops'],
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default: 'Intermediate'
  },
  percentage: { type: Number, default: 70, min: 0, max: 100 },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
