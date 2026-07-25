import { FiExternalLink, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ISSUER_ICONS = {
  udemy: '🎓', nptel: '📚', lpu: '🏫',
  coursera: '📖', google: '🔍', aws: '☁️', default: '🏆'
};

export default function Certificates({ certificates = [] }) {
  return (
    <section id="certificates" className="section certificates">
      <div className="container">
        <div className="certs-header">
          <div>
            <span className="section-label">Certificates</span>
            <h2 className="section-title">Professional <span>certifications</span></h2>
          </div>
        </div>

        <div className="certs-grid">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert._id || i}
              className="cert-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="cert-issuer">
                <div
                  className="cert-issuer-logo"
                  style={{ background: `${cert.issuer_color || '#1a1a1a'}15`, color: cert.issuer_color || '#1a1a1a' }}
                >
                  {ISSUER_ICONS[cert.issuer_logo] || ISSUER_ICONS.default}
                </div>
                <div>
                  <p className="cert-issuer-name">{cert.issuer}</p>
                  <p className="cert-issuer-date">{cert.date}</p>
                </div>
              </div>

              <h3 className="cert-title">{cert.title}</h3>

              {cert.url && (
                <a href={cert.url} target="_blank" rel="noreferrer" className="cert-link">
                  View Certificate <FiExternalLink size={13} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
