import { createContext, useContext, useState, useEffect } from 'react';
import { verifyToken } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem('admin_token');

    const timer = setTimeout(() => {
      if (isMounted) {
        setLoading(false);
      }
    }, 4000);

    if (token) {
      verifyToken()
        .then(res => {
          if (!isMounted) return;
          clearTimeout(timer);
          if (res.data && res.data.admin) {
            setAdmin(res.data.admin);
          } else {
            localStorage.removeItem('admin_token');
          }
        })
        .catch(() => {
          if (!isMounted) return;
          clearTimeout(timer);
          localStorage.removeItem('admin_token');
        })
        .finally(() => {
          if (isMounted) {
            clearTimeout(timer);
            setLoading(false);
          }
        });
    } else {
      clearTimeout(timer);
      setLoading(false);
    }

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
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
