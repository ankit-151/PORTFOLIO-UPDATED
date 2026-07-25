import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { submitContact } from '../api';

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await submitContact(form);
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-grid">
          {/* LEFT */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Get In Touch</span>
            <h2>
              Let&apos;s build something <span style={{ color: 'var(--primary)' }}>amazing</span> together.
            </h2>
            <p style={{ marginTop: 12 }}>
              Whether you have a project in mind or just want to chat about technology,
              I&apos;m always open to discussing new opportunities.
            </p>

            <div className="contact-details">
              <div className="contact-detail">
                <div className="contact-detail-icon"><FiMail /></div>
                <div>
                  <span className="contact-detail-label">Email</span>
                  <a href={`mailto:${profile?.email}`} className="contact-detail-value">
                    {profile?.email || 'ankitghanghas29@gmail.com'}
                  </a>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon"><FiPhone /></div>
                <div>
                  <span className="contact-detail-label">Phone</span>
                  <span className="contact-detail-value">{profile?.phone || '+91 9306992676'}</span>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon"><FiMapPin /></div>
                <div>
                  <span className="contact-detail-label">Location</span>
                  <span className="contact-detail-value">{profile?.location || 'India'}</span>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon">✅</div>
                <div>
                  <span className="contact-detail-label">Availability</span>
                  <span className="contact-detail-value" style={{ color: 'var(--success)' }}>
                    {profile?.availability || 'Open to work'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {success ? (
              <div className="form-success">
                <FiCheck size={24} style={{ display: 'block', margin: '0 auto 12px' }} />
                Message sent successfully! I&apos;ll get back to you soon.
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Your Name</label>
                    <input
                      id="contact-name" name="name" className="form-input"
                      placeholder="Ankit" value={form.name} onChange={handleChange} required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">Your Email</label>
                    <input
                      id="contact-email" name="email" type="email" className="form-input"
                      placeholder="hello@example.com" value={form.email} onChange={handleChange} required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Your Message</label>
                  <textarea
                    id="contact-message" name="message" className="form-input"
                    placeholder="I'd like to discuss..." value={form.message} onChange={handleChange} required
                    rows={6}
                  />
                </div>
                {error && <p style={{ color: 'var(--danger)', fontSize: 13 }}>{error}</p>}
                <button type="submit" className="form-submit" disabled={loading}>
                  {loading ? 'Sending...' : <><FiSend /> Send Message</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
