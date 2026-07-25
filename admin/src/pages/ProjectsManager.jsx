import { useState } from 'react';
import CRUDPage from '../components/CRUDPage';
import { projectsApi, uploadFile } from '../api';

function TagInput({ value = [], onChange }) {
  const [input, setInput] = useState('');
  const addTag = e => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      onChange([...value, { name: input.trim(), color: '#60a5fa' }]);
      setInput('');
    }
  };
  const removeTag = i => onChange(value.filter((_, idx) => idx !== i));
  return (
    <div className="tag-input-wrap">
      {value.map((tag, i) => (
        <span key={i} className="tag-chip">
          {tag.name}
          <button type="button" onClick={() => removeTag(i)}>×</button>
        </span>
      ))}
      <input className="tag-input-field" placeholder="Type and press Enter..." value={input}
        onChange={e => setInput(e.target.value)} onKeyDown={addTag} />
    </div>
  );
}

function ProjectForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: '', description: '', image: '', live_url: '', github_url: '',
    featured: false, order: 0, tags: [], tech_stack: [],
    ...initialData
  });
  const [techInput, setTechInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const addTech = e => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      set('tech_stack', [...(form.tech_stack || []), techInput.trim()]);
      setTechInput('');
    }
  };
  const removeTech = i => set('tech_stack', form.tech_stack.filter((_, idx) => idx !== i));

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadStatus('Uploading...');
    try {
      const res = await uploadFile(file);
      if (res.data?.success) {
        set('image', res.data.url);
        setUploadStatus('✅ Uploaded!');
        setTimeout(() => setUploadStatus(''), 2000);
      } else {
        setUploadStatus('❌ Failed');
      }
    } catch {
      setUploadStatus('❌ Error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form className="form" onSubmit={e => { e.preventDefault(); onSave(form); }}>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Project Title *</label>
          <input className="form-input" value={form.title} onChange={e => set('title', e.target.value)} required placeholder="NutriAI" />
        </div>
        <div className="form-group">
          <label className="form-label">Order</label>
          <input className="form-input" type="number" value={form.order} onChange={e => set('order', Number(e.target.value))} />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Description *</label>
        <textarea className="form-input" rows={3} value={form.description} onChange={e => set('description', e.target.value)} required />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Live URL</label>
          <input className="form-input" value={form.live_url} onChange={e => set('live_url', e.target.value)} placeholder="https://..." />
        </div>
        <div className="form-group">
          <label className="form-label">GitHub URL</label>
          <input className="form-input" value={form.github_url} onChange={e => set('github_url', e.target.value)} placeholder="https://github.com/..." />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Project Image</label>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            className="form-input"
            value={form.image}
            onChange={e => set('image', e.target.value)}
            placeholder="https://... or upload below"
            style={{ flex: 1 }}
          />
          <label style={{
            padding: '8px 14px', cursor: uploading ? 'not-allowed' : 'pointer',
            fontSize: 12, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center',
            gap: 6, background: uploading ? '#374151' : '#3b82f6', color: '#fff',
            border: 'none', borderRadius: '6px', opacity: uploading ? 0.7 : 1
          }}>
            📸 {uploading ? 'Uploading...' : 'Upload'}
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploading} />
          </label>
        </div>
        {uploadStatus && (
          <span style={{ fontSize: 12, marginTop: 4, display: 'block', color: uploadStatus.includes('✅') ? '#22c55e' : '#ef4444' }}>
            {uploadStatus}
          </span>
        )}
        {form.image && (
          <div style={{ marginTop: 8, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)', width: 120, height: 80 }}>
            <img
              src={form.image.startsWith('/') ? `http://localhost:5000${form.image}` : form.image}
              alt="Preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { e.target.style.display = 'none'; }}
            />
          </div>
        )}
      </div>
      <div className="form-group">
        <label className="form-label">Tags (press Enter to add)</label>
        <TagInput value={form.tags} onChange={v => set('tags', v)} />
      </div>
      <div className="form-group">
        <label className="form-label">Tech Stack (press Enter to add)</label>
        <div className="tag-input-wrap">
          {(form.tech_stack || []).map((t, i) => (
            <span key={i} className="tag-chip">{t}<button type="button" onClick={() => removeTech(i)}>×</button></span>
          ))}
          <input className="tag-input-field" placeholder="React.js, Node.js..." value={techInput}
            onChange={e => setTechInput(e.target.value)} onKeyDown={addTech} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <input type="checkbox" id="featured" checked={!!form.featured} onChange={e => set('featured', e.target.checked)} />
        <label htmlFor="featured" style={{ fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>
          Featured project (shown on homepage)
        </label>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">💾 Save Project</button>
      </div>
    </form>
  );
}

const COLUMNS = [
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description', render: v => <span style={{ maxWidth: 300, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v}</span> },
  { key: 'featured', label: 'Featured', render: v => v ? <span className="badge badge-green">✓ Featured</span> : <span className="badge">Standard</span> },
  { key: 'tech_stack', label: 'Stack', render: v => (v || []).slice(0, 3).map((t, i) => <span key={i} className="badge badge-blue" style={{ marginRight: 4 }}>{t}</span>) },
];

export default function ProjectsManager() {
  return (
    <CRUDPage
      title="Projects"
      subtitle="Manage your portfolio projects"
      api={projectsApi}
      columns={COLUMNS}
      FormComponent={ProjectForm}
      emptyMessage="No projects added yet"
    />
  );
}
