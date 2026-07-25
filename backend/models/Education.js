const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String },
  field: { type: String },
  location: { type: String },
  start_date: { type: String },
  end_date: { type: String },
  percentage_cgpa: { type: String },
  current: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Education', EducationSchema);
