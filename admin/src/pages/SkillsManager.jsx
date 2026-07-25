import { useState } from 'react';
import CRUDPage from '../components/CRUDPage';
import { skillsApi } from '../api';

const CATEGORIES = ['frontend', 'backend', 'database', 'tools', 'languages', 'ai_ml', 'devops'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

function SkillForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: '', category: 'frontend', level: 'Intermediate',
    percentage: 75, icon_color: '#60a5fa', order: 0,
    ...initialData
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'percentage' || name === 'order' ? Number(value) : value }));
  };

  return (
    <form className="form" onSubmit={e => { e.preventDefault(); onSave(form); }}>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Skill Name *</label>
          <input className="form-input" name="name" value={form.name} onChange={handleChange} required placeholder="React.js" />
        </div>
        <div className="form-group">
          <label className="form-label">Category *</label>
          <select className="form-input" name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Level</label>
          <select className="form-input" name="level" value={form.level} onChange={handleChange}>
            {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Percentage (0-100)</label>
          <input className="form-input" type="number" name="percentage" min={0} max={100} value={form.percentage} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Icon Color</label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="color" value={form.icon_color} onChange={e => setForm(f => ({ ...f, icon_color: e.target.value }))} style={{ width: 48, height: 40, border: 'none', background: 'none', cursor: 'pointer' }} />
            <input className="form-input" name="icon_color" value={form.icon_color} onChange={handleChange} placeholder="#60a5fa" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Display Order</label>
          <input className="form-input" type="number" name="order" value={form.order} onChange={handleChange} />
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">💾 Save Skill</button>
      </div>
    </form>
  );
}

const COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category', render: v => <span className="badge badge-blue">{v}</span> },
  { key: 'level', label: 'Level', render: v => <span className="badge badge-green">{v}</span> },
  { key: 'percentage', label: 'Progress', render: v => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 80, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${v}%`, height: '100%', background: 'var(--primary)' }} />
      </div>
      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{v}%</span>
    </div>
  )},
];

export default function SkillsManager() {
  return (
    <CRUDPage
      title="Skills"
      subtitle="Manage your tech stack and proficiency levels"
      api={skillsApi}
      columns={COLUMNS}
      FormComponent={SkillForm}
      emptyMessage="No skills added yet"
    />
  );
}
