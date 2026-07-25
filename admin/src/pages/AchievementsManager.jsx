import { useState } from 'react';
import CRUDPage from '../components/CRUDPage';
import { achievementsApi } from '../api';

const ICONS = ['code','github','projects','tech','trophy','star','users','heart'];

function AchievementForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState({ label: '', value: '', icon: 'code', description: '', is_stat: true, order: 0, ...initialData });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <form className="form" onSubmit={e => { e.preventDefault(); onSave(form); }}>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Label *</label>
          <input className="form-input" value={form.label} onChange={e => set('label', e.target.value)} required placeholder="LeetCode Problems" />
        </div>
        <div className="form-group">
          <label className="form-label">Value * (e.g. 100+)</label>
          <input className="form-input" value={form.value} onChange={e => set('value', e.target.value)} required placeholder="100+" />
        </div>
        <div className="form-group">
          <label className="form-label">Icon</label>
          <select className="form-input" value={form.icon} onChange={e => set('icon', e.target.value)}>
            {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Order</label>
          <input className="form-input" type="number" value={form.order} onChange={e => set('order', Number(e.target.value))} />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <input className="form-input" value={form.description} onChange={e => set('description', e.target.value)} placeholder="Brief description" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <input type="checkbox" id="is-stat" checked={!!form.is_stat} onChange={e => set('is_stat', e.target.checked)} />
        <label htmlFor="is-stat" style={{ fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>Show in stats counter (with animated count-up)</label>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">💾 Save</button>
      </div>
    </form>
  );
}

const COLUMNS = [
  { key: 'label', label: 'Label' },
  { key: 'value', label: 'Value', render: v => <strong style={{ color: 'var(--primary)', fontSize: 16 }}>{v}</strong> },
  { key: 'icon', label: 'Icon' },
  { key: 'is_stat', label: 'Type', render: v => v ? <span className="badge badge-blue">Stat Counter</span> : <span className="badge badge-yellow">Highlight</span> },
];

export default function AchievementsManager() {
  return (
    <CRUDPage title="Achievements" subtitle="Manage stats and notable highlights"
      api={achievementsApi} columns={COLUMNS} FormComponent={AchievementForm} />
  );
}
