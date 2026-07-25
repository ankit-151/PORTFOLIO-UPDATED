const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  issuer_logo: { type: String },
  issuer_color: { type: String, default: '#1a1a1a' },
  date: { type: String },
  url: { type: String },
  credential_id: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', CertificateSchema);
