import { useState } from 'react';
import CRUDPage from '../components/CRUDPage';
import { educationApi } from '../api';

function EduForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState({ institution: '', degree: '', field: '', location: '', start_date: '', end_date: '', percentage_cgpa: '', current: false, order: 0, ...initialData });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <form className="form" onSubmit={e => { e.preventDefault(); onSave(form); }}>
      <div className="form-group">
        <label className="form-label">Institution *</label>
        <input className="form-input" value={form.institution} onChange={e => set('institution', e.target.value)} required placeholder="Lovely Professional University" />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Degree</label>
          <input className="form-input" value={form.degree} onChange={e => set('degree', e.target.value)} placeholder="Bachelor of Technology" />
        </div>
        <div className="form-group">
          <label className="form-label">Field of Study</label>
          <input className="form-input" value={form.field} onChange={e => set('field', e.target.value)} placeholder="Computer Science and Engineering" />
        </div>
        <div className="form-group">
          <label className="form-label">Location</label>
          <input className="form-input" value={form.location} onChange={e => set('location', e.target.value)} placeholder="Phagwara, Punjab" />
        </div>
        <div className="form-group">
          <label className="form-label">CGPA / Percentage</label>
          <input className="form-input" value={form.percentage_cgpa} onChange={e => set('percentage_cgpa', e.target.value)} placeholder="CGPA: 7.17" />
        </div>
        <div className="form-group">
          <label className="form-label">Start Date</label>
          <input className="form-input" value={form.start_date} onChange={e => set('start_date', e.target.value)} placeholder="Aug 2023" />
        </div>
        <div className="form-group">
          <label className="form-label">End Date</label>
          <input className="form-input" value={form.end_date} onChange={e => set('end_date', e.target.value)} placeholder="Present" />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <input type="checkbox" id="current-edu" checked={!!form.current} onChange={e => set('current', e.target.checked)} />
        <label htmlFor="current-edu" style={{ fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>Currently studying here</label>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">💾 Save</button>
      </div>
    </form>
  );
}

const COLUMNS = [
  { key: 'institution', label: 'Institution' },
  { key: 'degree', label: 'Degree' },
  { key: 'percentage_cgpa', label: 'Grade' },
  { key: 'current', label: 'Status', render: v => v ? <span className="badge badge-green">Current</span> : <span className="badge">Completed</span> },
];

export default function EducationManager() {
  return (
    <CRUDPage title="Education" subtitle="Manage your academic background"
      api={educationApi} columns={COLUMNS} FormComponent={EduForm} />
  );
}
