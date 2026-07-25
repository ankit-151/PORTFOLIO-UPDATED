const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const sendContactEmails = require('../utils/email');

// @route   POST /api/contact — Public form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    const contact = await Contact.create({ name, email, message });
    
    // Send email notifications asynchronously (non-blocking)
    sendContactEmails({ name, email, message }).catch(err => {
      console.error('❌ Email sending error in contact route:', err);
    });

    res.status(201).json({ success: true, message: 'Message sent successfully!', data: contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/contact — Admin view messages
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// @route   PUT /api/contact/:id — Mark as read
router.put('/:id', auth, async (req, res) => {
  try {
    const msg = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: msg });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// @route   DELETE /api/contact/:id — Delete message
router.delete('/:id', auth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
