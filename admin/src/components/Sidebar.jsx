import {
  FiGrid, FiUser, FiCode, FiFolderPlus, FiAward,
  FiBookOpen, FiMail, FiLogOut, FiExternalLink,
  FiTrendingUp, FiBook, FiCpu, FiFileText
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      { key: 'dashboard', label: 'Dashboard', icon: <FiGrid /> },
      { key: 'messages', label: 'Messages', icon: <FiMail /> },
    ]
  },
  {
    label: 'Content',
    items: [
      { key: 'photo', label: 'Photo & Details', icon: <FiUser /> },
      { key: 'resume', label: 'Resume & Links', icon: <FiFileText /> },
      { key: 'skills', label: 'Skills', icon: <FiCode /> },
      { key: 'projects', label: 'Projects', icon: <FiFolderPlus /> },
      { key: 'experience', label: 'Experience', icon: <FiTrendingUp /> },
    ]
  },
  {
    label: 'Credentials',
    items: [
      { key: 'certificates', label: 'Certificates', icon: <FiAward /> },
      { key: 'achievements', label: 'Achievements', icon: <FiBookOpen /> },
      { key: 'education', label: 'Education', icon: <FiBook /> },
      { key: 'training', label: 'Training', icon: <FiCpu /> },
    ]
  }
];

export default function Sidebar({ active, setActive, open }) {
  const { admin, logout } = useAuth();

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">AP</div>
        <div style={{ overflow: 'hidden' }}>
          <div className="sidebar-title">Portfolio Admin</div>
          <div className="sidebar-subtitle" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{admin?.email}</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_SECTIONS.map(section => (
          <div key={section.label}>
            <div className="sidebar-section-label">{section.label}</div>
            {section.items.map(item => (
              <button
                key={item.key}
                className={`nav-item ${active === item.key ? 'active' : ''}`}
                onClick={() => setActive(item.key)}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <a
          href={import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173'}
          target="_blank"
          rel="noreferrer"
          className="nav-item"
          style={{ marginBottom: 4 }}
        >
          <FiExternalLink /> View Portfolio
        </a>
        <button className="nav-item" onClick={logout} style={{ color: 'var(--danger)' }}>
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
}
