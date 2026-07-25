import { useState } from 'react';
import CRUDPage from '../components/CRUDPage';
import { certificatesApi } from '../api';

function CertForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState({ title: '', issuer: '', issuer_logo: 'default', issuer_color: '#1565C0', date: '', url: '', order: 0, ...initialData });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <form className="form" onSubmit={e => { e.preventDefault(); onSave(form); }}>
      <div className="form-group">
        <label className="form-label">Certificate Title *</label>
        <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} required placeholder="Cloud Computing" />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Issuer *</label>
          <input className="form-input" value={form.issuer} onChange={e => set('issuer', e.target.value)} required placeholder="NPTEL" />
        </div>
        <div className="form-group">
          <label className="form-label">Issuer Logo Key</label>
          <select className="form-input" value={form.issuer_logo} onChange={e => set('issuer_logo', e.target.value)}>
            {['udemy','nptel','lpu','coursera','google','aws','default'].map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Issuer Color</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="color" value={form.issuer_color} onChange={e => set('issuer_color', e.target.value)} style={{ width: 48, height: 40, border: 'none', background: 'none' }} />
            <input className="form-input" value={form.issuer_color} onChange={e => set('issuer_color', e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Date (e.g. Nov 2024)</label>
          <input className="form-input" value={form.date} onChange={e => set('date', e.target.value)} placeholder="Nov 2024" />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Certificate URL</label>
        <input className="form-input" value={form.url} onChange={e => set('url', e.target.value)} placeholder="https://..." />
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">💾 Save</button>
      </div>
    </form>
  );
}

const COLUMNS = [
  { key: 'title', label: 'Title', render: v => <span style={{ maxWidth: 260, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v}</span> },
  { key: 'issuer', label: 'Issuer' },
  { key: 'date', label: 'Date' },
  { key: 'url', label: 'Link', render: v => v ? <a href={v} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', fontSize: 12 }}>View →</a> : '—' },
];

export default function CertificatesManager() {
  return (
    <CRUDPage title="Certificates" subtitle="Manage your professional certifications"
      api={certificatesApi} columns={COLUMNS} FormComponent={CertForm} />
  );
}
