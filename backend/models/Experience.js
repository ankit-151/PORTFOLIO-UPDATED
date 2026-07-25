const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String },
  location: { type: String },
  period: { type: String },
  start_date: { type: String },
  end_date: { type: String },
  current: { type: Boolean, default: false },
  description: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Experience', ExperienceSchema);
