import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { profileApi, uploadFile } from '../api';
import { Toast, useToast } from '../components/Toast';

export default function ResumeEditor() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast, showToast } = useToast();

  useEffect(() => {
    profileApi.get().then(res => {
      reset(res.data.data || {});
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [reset]);

  const onSubmit = async data => {
    setSaving(true);
    try {
      await profileApi.update(data);
      showToast('Resume and links updated successfully!');
      reset(data);
    } catch {
      showToast('Failed to update resume details', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      showToast('Uploading resume...');
      const res = await uploadFile(file);
      if (res.data?.success) {
        setValue(fieldName, res.data.url, { shouldDirty: true });
        showToast('Resume uploaded successfully!');
      } else {
        showToast('Upload failed', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'Error uploading file', 'error');
    }
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>;

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Resume & Social Links</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>Upload your resume and edit your social platform connections</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header"><h3 className="card-title">Resume & CV</h3></div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Resume Document (PDF/DOC)</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input className="form-input" {...register('resume_url')} placeholder="https://drive.google.com/..." style={{ flex: 1 }} />
                <label className="btn btn-secondary" style={{ padding: '8px 12px', cursor: 'pointer', fontSize: 12, margin: 0, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px' }}>
                  📁 Upload
                  <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileUpload(e, 'resume_url')} style={{ display: 'none' }} />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header"><h3 className="card-title">Social Platform Connections</h3></div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">GitHub URL</label>
                <input className="form-input" {...register('github')} placeholder="https://github.com/ankit-151" />
              </div>
              <div className="form-group">
                <label className="form-label">LinkedIn URL</label>
                <input className="form-input" {...register('linkedin')} placeholder="https://linkedin.com/in/..." />
              </div>
              <div className="form-group">
                <label className="form-label">Twitter/X URL</label>
                <input className="form-input" {...register('twitter')} placeholder="https://twitter.com/..." />
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header"><h3 className="card-title">Hero Code Snippet</h3></div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Code snippet displayed in Hero Card</label>
              <textarea
                className="form-input"
                rows={8}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}
                {...register('hero_code_snippet')}
                placeholder={`const developer = {\n  name: "Ankit",\n  role: "Full Stack Developer"\n};`}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : '💾 Save Resume & Socials'}
          </button>
        </div>
      </form>

      {toast && <Toast {...toast} />}
    </div>
  );
}
