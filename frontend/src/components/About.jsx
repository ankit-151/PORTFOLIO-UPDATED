import { FiMail, FiPhone, FiMapPin, FiBook } from 'react-icons/fi';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay }
});

export default function About({ profile, experience }) {
  const stats = profile?.stats || [
    { label: 'Years Learning', value: '2+' },
    { label: 'Projects Completed', value: '5+' },
    { label: 'Certifications', value: '3+' },
    { label: 'GitHub Repos', value: '10+' },
  ];

  return (
    <section id="about" className="section about">
      <div className="container">
        <motion.div {...fadeUp(0)}>
          <span className="section-label">About Me</span>
          <h2 className="section-title">
            Passionate developer crafting<br />
            <span>digital experiences.</span>
          </h2>
        </motion.div>

        <div className="about-grid" style={{ marginTop: 40 }}>
          {/* LEFT */}
          <div>
            <div className="about-stats">
              {stats.map((stat, i) => (
                <motion.div key={i} className="stat-item card" {...fadeUp(i * 0.1)}>
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.p className="about-bio" {...fadeUp(0.2)}>
              {profile?.bio || "I'm a Computer Science student and a Full Stack Developer who loves turning ideas into reality. I enjoy building scalable web applications, exploring AI, and constantly learning new technologies."}
            </motion.p>

            <motion.div className="about-info-grid" {...fadeUp(0.3)}>
              <div className="info-item">
                <FiMail color="var(--primary)" />
                <div>
                  <span className="info-label">Email</span>
                  <span className="info-value">{profile?.email || 'ankitghanghas29@gmail.com'}</span>
                </div>
              </div>
              <div className="info-item">
                <FiPhone color="var(--primary)" />
                <div>
                  <span className="info-label">Phone</span>
                  <span className="info-value">{profile?.phone || '+91 9306992676'}</span>
                </div>
              </div>
              <div className="info-item">
                <FiMapPin color="var(--primary)" />
                <div>
                  <span className="info-label">Location</span>
                  <span className="info-value">{profile?.location || 'India'}</span>
                </div>
              </div>
              <div className="info-item">
                <FiBook color="var(--primary)" />
                <div>
                  <span className="info-label">Education</span>
                  <span className="info-value">B.Tech CSE</span>
                </div>
              </div>
              <div className="info-item">
                <span style={{ fontSize: 16, color: 'var(--primary)' }}>💼</span>
                <div>
                  <span className="info-label">Freelance</span>
                  <span className="info-value">{profile?.freelance || 'Available'}</span>
                </div>
              </div>
              <div className="info-item">
                <span style={{ fontSize: 16, color: 'var(--primary)' }}>✅</span>
                <div>
                  <span className="info-label">Status</span>
                  <span className="info-value" style={{ color: 'var(--success)' }}>{profile?.availability || 'Open to work'}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Timeline */}
          <motion.div {...fadeUp(0.2)}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, color: 'var(--text-primary)' }}>
              Experience Timeline
            </h3>
            <div className="timeline">
              {(experience || []).map((exp, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot" style={{ background: exp.current ? 'var(--primary)' : 'var(--text-muted)' }} />
                  <p className="timeline-period">{exp.period || `${exp.start_date} – ${exp.current ? 'Present' : exp.end_date}`}</p>
                  <p className="timeline-title">{exp.title}</p>
                  {exp.company && <p className="timeline-company">{exp.company}</p>}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
