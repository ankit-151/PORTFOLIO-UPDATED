const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: { type: String, default: 'Full Stack Developer' },
  bio: { type: String },
  email: { type: String },
  phone: { type: String },
  location: { type: String },
  availability: { type: String, default: 'Open to work' },
  freelance: { type: String, default: 'Available' },
  github: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
  resume_url: { type: String },
  profile_image: { type: String },
  hero_code_snippet: { type: String },
  stats: [
    {
      label: { type: String },
      value: { type: String },
      order: { type: Number, default: 0 }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
