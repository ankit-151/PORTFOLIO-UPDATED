import { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiDownload, FiMenu, FiX } from 'react-icons/fi';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ theme, toggleTheme, profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoModalOpen, setLogoModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = NAV_LINKS.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const name = profile?.name || 'Ankit';
  const initials = name.slice(0, 2).toUpperCase();

  const getMediaUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('/')) {
      const backendUrl = import.meta.env.VITE_API_URL 
        ? import.meta.env.VITE_API_URL.replace('/api', '') 
        : 'http://localhost:5000';
      return `${backendUrl}${url}`;
    }
    return url;
  };

  const handleLogoClick = (e) => {
    if (profile?.profile_image) {
      e.preventDefault();
      e.stopPropagation();
      setLogoModalOpen(true);
    }
  };

  return (
    <>
      <nav className="navbar" style={{ boxShadow: scrolled ? 'var(--shadow)' : 'none' }}>
        <div className="navbar-inner">
          <a href="#home" className="navbar-logo" onClick={handleLogoClick}>
            <div className="navbar-logo-icon" style={{ overflow: 'hidden', padding: 0, cursor: 'pointer' }}>
              {profile?.profile_image ? (
                <img src={getMediaUrl(profile.profile_image)} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                initials
              )}
            </div>
            <span>{name}</span>
          </a>

          <ul className="navbar-links">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={activeSection === link.href.slice(1) ? 'active' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar-actions">
            <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>
            {profile?.resume_url && (
              <a href={getMediaUrl(profile.resume_url)} target="_blank" rel="noreferrer" className="navbar-resume">
                Resume <FiDownload size={14} />
              </a>
            )}
            {!profile?.resume_url && (
              <span className="navbar-resume" style={{ cursor: 'default', opacity: 0.6 }}>
                Resume <FiDownload size={14} />
              </span>
            )}
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </div>

      {logoModalOpen && profile?.profile_image && (
        <div 
          className="logo-lightbox-overlay" 
          onClick={() => setLogoModalOpen(false)}
        >
          <div className="logo-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="logo-lightbox-close" onClick={() => setLogoModalOpen(false)}>&times;</button>
            <img src={getMediaUrl(profile.profile_image)} alt={name} className="logo-lightbox-image" />
            <span style={{ fontSize: '13px', fontWeight: 600, marginTop: '8px', color: 'var(--text-secondary)' }}>{name}</span>
          </div>
        </div>
      )}
    </>
  );
}
