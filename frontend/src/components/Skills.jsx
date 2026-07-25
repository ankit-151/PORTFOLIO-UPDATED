import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'database', label: 'Database' },
  { key: 'ai_ml', label: 'AI/ML' },
  { key: 'tools', label: 'Tools' },
  { key: 'languages', label: 'Languages' },
];

const SKILL_ICONS = {
  'React.js': '⚛️', 'Next.js': '▲', 'HTML': '🌐', 'CSS': '🎨',
  'Tailwind CSS': '💨', 'Node.js': '🟢', 'Express.js': '🚀',
  'PHP': '🐘', 'REST APIs': '🔌', 'MongoDB': '🍃', 'MySQL': '🐬',
  'JavaScript': '🟡', 'Python': '🐍', 'Java': '☕', 'C++': '⚡',
  'C': '🔷', 'Git': '🦊', 'Postman': '📮', 'AWS': '☁️',
  'Firebase': '🔥', 'OpenAI API': '🤖', 'Generative AI': '✨',
};

function SkillCard({ skill, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="skill-card"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="skill-icon" style={{ color: skill.icon_color || '#60a5fa' }}>
        {SKILL_ICONS[skill.name] || '💻'}
      </div>
      <p className="skill-name">{skill.name}</p>
      <p className="skill-level">{skill.level}</p>
      <div className="skill-bar">
        <div
          className="skill-bar-fill"
          style={{ width: visible ? `${skill.percentage}%` : '0%' }}
        />
      </div>
      <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6, textAlign: 'right' }}>
        {skill.percentage}%
      </p>
    </motion.div>
  );
}

export default function Skills({ skills = [] }) {
  const [active, setActive] = useState('all');

  const filtered = active === 'all'
    ? skills
    : skills.filter(s => s.category === active);

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">My Tech Stack</span>
          <h2 className="section-title">Technologies I work <span>with</span></h2>
        </motion.div>

        <div className="skills-filter" style={{ marginTop: 32 }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              className={`filter-btn ${active === cat.key ? 'active' : ''}`}
              onClick={() => setActive(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {filtered.map((skill, i) => (
            <SkillCard key={skill._id || i} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
