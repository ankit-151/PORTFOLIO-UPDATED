import { FiGithub, FiLinkedin, FiHeart } from 'react-icons/fi';

export default function Footer({ profile }) {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 12 }}>
          {profile?.github && (
            <a href={profile.github} target="_blank" rel="noreferrer" className="social-icon">
              <FiGithub />
            </a>
          )}
          {profile?.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="social-icon">
              <FiLinkedin />
            </a>
          )}
          {profile?.email && (
            <a href={`mailto:${profile.email}`} className="social-icon">📧</a>
          )}
        </div>
        {/* Footer text removed as requested */}
      </div>
    </footer>
  );
}
