import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ICONS = {
  code: '💻', github: '🐙', projects: '📂', tech: '⚙️',
  trophy: '🏆', star: '⭐', users: '👥', heart: '❤️', default: '🎯'
};

function CountUp({ target = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const numStr = (target || '').replace(/[^0-9]/g, '');
  const num = parseInt(numStr) || 0;
  const suffix = (target || '').replace(/[0-9]/g, '');

  useEffect(() => {
    let start = 0;
    const step = num / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [num, duration]);

  return <>{count}{suffix}</>;
}

function AchievementStat({ achievement, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="achievement-stat"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="achievement-icon">{ICONS[achievement.icon] || ICONS.default}</div>
      <span className="achievement-value">
        {visible ? <CountUp target={achievement.value} /> : '0'}
      </span>
      <p className="achievement-label">{achievement.label}</p>
    </motion.div>
  );
}

export default function Achievements({ achievements = [] }) {
  const safeList = achievements || [];
  const stats = safeList.filter(a => a && a.is_stat !== false);
  const highlights = safeList.filter(a => a && a.is_stat === false);

  return (
    <section id="achievements" className="section achievements">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Achievements</span>
          <h2 className="section-title">Numbers that <span>define me</span></h2>
        </motion.div>

        <div className="achievements-stats" style={{ marginTop: 40 }}>
          {stats.map((ach, i) => (
            <AchievementStat key={ach._id || i} achievement={ach} index={i} />
          ))}
        </div>

        {highlights.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>
              Notable Highlights
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {highlights.map((ach, i) => (
                <motion.div
                  key={ach._id || i}
                  style={{
                    padding: '16px 20px', background: 'var(--bg-card)',
                    border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                    display: 'flex', alignItems: 'flex-start', gap: 12
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <span style={{ fontSize: 24 }}>{ICONS[ach.icon] || ICONS.default}</span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{ach.label}</p>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{ach.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
