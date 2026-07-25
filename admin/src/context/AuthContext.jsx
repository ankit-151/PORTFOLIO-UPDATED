import { createContext, useContext, useState, useEffect } from 'react';
import { verifyToken } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      verifyToken()
        .then(res => { setAdmin(res.data.admin); })
        .catch(() => { localStorage.removeItem('admin_token'); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const loginUser = (token, adminData) => {
    localStorage.setItem('admin_token', token);
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
