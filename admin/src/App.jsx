import './index.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import AdminLayout from './AdminLayout';

function AppInner() {
  const { admin, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <div style={{ width: 36, height: 36, border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
          Loading...
        </div>
      </div>
    );
  }

  if (!admin) return <Login />;
  return <AdminLayout />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
