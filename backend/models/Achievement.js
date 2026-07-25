const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  icon: { type: String, default: 'code' }, // icon name
  description: { type: String },
  is_stat: { type: Boolean, default: true }, // show in hero stats counter?
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', AchievementSchema);
