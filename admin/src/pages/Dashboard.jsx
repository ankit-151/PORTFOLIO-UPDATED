import { useEffect, useState } from 'react';
import { skillsApi, projectsApi, certificatesApi, achievementsApi, contactApi } from '../api';

export default function Dashboard() {
  const [stats, setStats] = useState({ skills: 0, projects: 0, certs: 0, messages: 0 });

  useEffect(() => {
    Promise.all([
      skillsApi.getAll(), projectsApi.getAll(),
      certificatesApi.getAll(), contactApi.getAll()
    ]).then(([s, p, c, m]) => {
      setStats({
        skills: s.data.data?.length || 0,
        projects: p.data.data?.length || 0,
        certs: c.data.data?.length || 0,
        messages: m.data.data?.length || 0,
      });
    }).catch(() => {});
  }, []);

  const cards = [
    { label: 'Skills', value: stats.skills, icon: '💻', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
    { label: 'Projects', value: stats.projects, icon: '🚀', color: '#22c55e', bg: 'rgba(34,197,94,0.15)' },
    { label: 'Certificates', value: stats.certs, icon: '🏆', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
    { label: 'Messages', value: stats.messages, icon: '✉️', color: '#a855f7', bg: 'rgba(168,85,247,0.15)' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Dashboard</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>
        Overview of your portfolio content
      </p>

      <div className="stats-grid">
        {cards.map((card, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: card.bg, color: card.color }}>
              {card.icon}
            </div>
            <div>
              <div className="stat-value">{card.value}</div>
              <div className="stat-label">{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Quick Guide</h3>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {[
              { emoji: '👤', title: 'Profile', desc: 'Edit your name, bio, contact info & social links' },
              { emoji: '💻', title: 'Skills', desc: 'Add/remove technologies with levels & progress' },
              { emoji: '🚀', title: 'Projects', desc: 'Manage portfolio projects with images & links' },
              { emoji: '📜', title: 'Certificates', desc: 'Add professional certifications & courses' },
              { emoji: '🏆', title: 'Achievements', desc: 'Update stats and notable highlights' },
              { emoji: '🎓', title: 'Education', desc: 'Manage academic background' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: 22, marginBottom: 6 }}>{item.emoji}</p>
                <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{item.title}</p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
