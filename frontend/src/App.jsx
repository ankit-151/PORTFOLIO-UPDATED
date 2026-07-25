import { useState, useEffect } from 'react';
import './index.css';
import { getPortfolioData } from './api';
import { MOCK_DATA } from './mockData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    let isMounted = true;

    // Safety timeout: if API call takes more than 4 seconds, fallback to MOCK_DATA
    const fallbackTimer = setTimeout(() => {
      if (isMounted) {
        console.warn('Backend response timed out, falling back to static data.');
        setData(MOCK_DATA);
        setUsingMock(true);
        setLoading(false);
      }
    }, 4000);

    getPortfolioData()
      .then(res => {
        if (!isMounted) return;
        clearTimeout(fallbackTimer);
        if (res.data && res.data.success && res.data.data && res.data.data.profile) {
          setData(res.data.data);
        } else {
          console.warn('Invalid or incomplete API response, falling back to static data.');
          setData(MOCK_DATA);
          setUsingMock(true);
        }
        setLoading(false);
      })
      .catch(err => {
        if (!isMounted) return;
        clearTimeout(fallbackTimer);
        console.warn('Backend unavailable, using static fallback:', err?.message || err);
        setData(MOCK_DATA);
        setUsingMock(true);
        setLoading(false);
      });

    return () => {
      isMounted = false;
      clearTimeout(fallbackTimer);
    };
  }, []);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner" />
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Loading portfolio...</p>
      </div>
    );
  }

  const handleAdminClick = (e) => {
    const envAdminUrl = import.meta.env.VITE_ADMIN_URL;
    if (envAdminUrl) {
      window.open(envAdminUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      window.open('http://localhost:5174', '_blank', 'noopener,noreferrer');
      return;
    }

    e.preventDefault();
    alert('Admin URL is not configured for production yet.\n\nPlease set VITE_ADMIN_URL in your Vercel Environment Variables to your deployed Admin Panel URL.');
  };

  return (
    <>
      {usingMock && (
        <div style={{
          position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)',
          background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 999, padding: '8px 18px', fontSize: 12,
          color: '#94a3b8', zIndex: 9999, display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)', whiteSpace: 'nowrap'
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
          Static mode — start backend for live data
        </div>
      )}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        profile={data?.profile}
      />
      <main>
        <Hero profile={data?.profile} />
        <About profile={data?.profile} experience={data?.experience} />
        <Skills skills={data?.skills} />
        <Projects projects={data?.projects} />
        <Achievements achievements={data?.achievements} />
        <Certificates certificates={data?.certificates} />
        <Contact profile={data?.profile} />
      </main>
      <Footer profile={data?.profile} />

      {/* Floating Admin Trigger */}
      <a
        href={import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174'}
        onClick={handleAdminClick}
        className="admin-floating-trigger"
        title="Open Admin Panel"
      >
        {data?.profile?.name || 'Ankit'}
      </a>
    </>
  );
}

export default App;
