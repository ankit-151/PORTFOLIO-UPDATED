import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { profileApi, uploadFile } from '../api';
import { Toast, useToast } from '../components/Toast';

export default function PhotoEditor() {
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
      showToast('Profile photo and details updated successfully!');
      reset(data);
    } catch {
      showToast('Failed to update details', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      showToast('Uploading photo...');
      const res = await uploadFile(file);
      if (res.data?.success) {
        setValue(fieldName, res.data.url, { shouldDirty: true });
        showToast('Photo uploaded successfully!');
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
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Profile Photo & Bio</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>Upload your profile photo and edit your personal details</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header"><h3 className="card-title">Personal Details</h3></div>
          <div className="card-body">
            <div className="form form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input className="form-input" {...register('name', { required: true })} placeholder="Ankit" />
              </div>
              <div className="form-group">
                <label className="form-label">Tagline</label>
                <input className="form-input" {...register('tagline')} placeholder="Full Stack Developer" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" {...register('email')} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" {...register('phone')} placeholder="+91 9306992676" />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input className="form-input" {...register('location')} placeholder="Phagwara, Punjab, India" />
              </div>
              <div className="form-group">
                <label className="form-label">Availability</label>
                <input className="form-input" {...register('availability')} placeholder="Open to work" />
              </div>
              <div className="form-group">
                <label className="form-label">Freelance Status</label>
                <input className="form-input" {...register('freelance')} placeholder="Available" />
              </div>
              <div className="form-group">
                <label className="form-label">Profile Image URL</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input className="form-input" {...register('profile_image')} placeholder="/uploads/..." style={{ flex: 1 }} />
                  <label className="btn btn-secondary" style={{ padding: '8px 12px', cursor: 'pointer', fontSize: 12, margin: 0, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px' }}>
                    📁 Upload
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'profile_image')} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group" style={{ marginTop: 16 }}>
              <label className="form-label">Bio</label>
              <textarea className="form-input" rows={4} {...register('bio')} placeholder="Write something about yourself..." />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : '💾 Save Photo & Bio'}
          </button>
        </div>
      </form>

      {toast && <Toast {...toast} />}
    </div>
  );
}
