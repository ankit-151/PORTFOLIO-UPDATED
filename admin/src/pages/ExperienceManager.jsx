import { useState } from 'react';
import CRUDPage from '../components/CRUDPage';
import { experienceApi } from '../api';

function ExperienceForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState({ title: '', company: '', period: '', current: false, description: '', order: 0, ...initialData });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <form className="form" onSubmit={e => { e.preventDefault(); onSave(form); }}>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Job Title *</label>
          <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} required placeholder="Full Stack Developer" />
        </div>
        <div className="form-group">
          <label className="form-label">Company/Organization</label>
          <input className="form-input" value={form.company} onChange={e => set('company', e.target.value)} placeholder="Self-Employed" />
        </div>
        <div className="form-group">
          <label className="form-label">Period (e.g. 2024 - Present)</label>
          <input className="form-input" value={form.period} onChange={e => set('period', e.target.value)} placeholder="2024 - Present" />
        </div>
        <div className="form-group">
          <label className="form-label">Order</label>
          <input className="form-input" type="number" value={form.order} onChange={e => set('order', Number(e.target.value))} />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea className="form-input" rows={3} value={form.description} onChange={e => set('description', e.target.value)} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <input type="checkbox" id="current-exp" checked={!!form.current} onChange={e => set('current', e.target.checked)} />
        <label htmlFor="current-exp" style={{ fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>Current position</label>
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
  { key: 'company', label: 'Company' },
  { key: 'period', label: 'Period' },
  { key: 'current', label: 'Status', render: v => v ? <span className="badge badge-green">Current</span> : <span className="badge">Past</span> },
];

export default function ExperienceManager() {
  return (
    <CRUDPage title="Experience" subtitle="Manage your experience timeline"
      api={experienceApi} columns={COLUMNS} FormComponent={ExperienceForm} />
  );
}
