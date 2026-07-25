import { useState } from 'react';
import { login } from '../api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { loginUser } = useAuth();
  const [form, setForm] = useState({ email: 'admin@portfolio.com', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await login(form);
      loginUser(res.data.token, res.data.admin);
    } catch {
      setError('Invalid credentials. Default: admin@portfolio.com / admin123');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">🔐</div>
          <h1 className="login-title">Admin Panel</h1>
          <p className="login-subtitle">Sign in to manage your portfolio</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email" className="form-input"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password" className="form-input"
              placeholder="admin123"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }} disabled={loading}>
            {loading ? 'Signing in...' : '🔓 Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'var(--text-muted)' }}>
          Default: admin@portfolio.com / admin123
        </p>
      </div>
    </div>
  );
}
