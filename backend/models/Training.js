const mongoose = require('mongoose');

const TrainingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  provider: { type: String },
  type: { type: String, default: 'Self-Guided' },
  tech_stack: [{ type: String }],
  start_date: { type: String },
  end_date: { type: String },
  highlights: [{ type: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Training', TrainingSchema);
