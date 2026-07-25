const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  tags: [
    {
      name: { type: String },
      color: { type: String, default: '#60a5fa' }
    }
  ],
  tech_stack: [{ type: String }],
  live_url: { type: String },
  github_url: { type: String },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
