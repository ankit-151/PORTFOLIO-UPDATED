import { useState } from 'react';
import CRUDPage from '../components/CRUDPage';
import { trainingApi } from '../api';

function TrainingForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState({ title: '', provider: '', type: 'Self-Guided', tech_stack: [], start_date: '', end_date: '', highlights: [], order: 0, ...initialData });
  const [techInput, setTechInput] = useState('');
  const [hlInput, setHlInput] = useState('');
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const addTech = e => { if (e.key === 'Enter' && techInput.trim()) { e.preventDefault(); set('tech_stack', [...(form.tech_stack || []), techInput.trim()]); setTechInput(''); } };
  const addHl = e => { if (e.key === 'Enter' && hlInput.trim()) { e.preventDefault(); set('highlights', [...(form.highlights || []), hlInput.trim()]); setHlInput(''); } };

  return (
    <form className="form" onSubmit={e => { e.preventDefault(); onSave(form); }}>
      <div className="form-group">
        <label className="form-label">Title *</label>
        <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} required placeholder="Mastering DSA" />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Provider</label>
          <input className="form-input" value={form.provider} onChange={e => set('provider', e.target.value)} placeholder="Self-Guided Training" />
        </div>
        <div className="form-group">
          <label className="form-label">Type</label>
          <input className="form-input" value={form.type} onChange={e => set('type', e.target.value)} placeholder="Self-Guided" />
        </div>
        <div className="form-group">
          <label className="form-label">Start Date</label>
          <input className="form-input" value={form.start_date} onChange={e => set('start_date', e.target.value)} placeholder="Jun 2025" />
        </div>
        <div className="form-group">
          <label className="form-label">End Date</label>
          <input className="form-input" value={form.end_date} onChange={e => set('end_date', e.target.value)} placeholder="Jul 2025" />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Tech Stack (Enter to add)</label>
        <div className="tag-input-wrap">
          {(form.tech_stack || []).map((t, i) => <span key={i} className="tag-chip">{t}<button type="button" onClick={() => set('tech_stack', form.tech_stack.filter((_, j) => j !== i))}>×</button></span>)}
          <input className="tag-input-field" value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={addTech} placeholder="C++, Python..." />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Key Highlights (Enter to add)</label>
        <div className="tag-input-wrap" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          {(form.highlights || []).map((h, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)', flex: 1 }}>• {h}</span>
              <button type="button" className="btn btn-danger btn-sm" onClick={() => set('highlights', form.highlights.filter((_, j) => j !== i))}>×</button>
            </div>
          ))}
          <input className="tag-input-field" value={hlInput} onChange={e => setHlInput(e.target.value)} onKeyDown={addHl} placeholder="Type a highlight and press Enter..." style={{ padding: '4px 0' }} />
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">💾 Save</button>
      </div>
    </form>
  );
}

const COLUMNS = [
  { key: 'title', label: 'Title' },
  { key: 'provider', label: 'Provider' },
  { key: 'start_date', label: 'Start' },
  { key: 'end_date', label: 'End' },
  { key: 'tech_stack', label: 'Tech', render: v => (v || []).map((t, i) => <span key={i} className="badge badge-blue" style={{ marginRight: 4 }}>{t}</span>) },
];

export default function TrainingManager() {
  return (
    <CRUDPage title="Training" subtitle="Manage training and self-learning courses"
      api={trainingApi} columns={COLUMNS} FormComponent={TrainingForm} />
  );
}
