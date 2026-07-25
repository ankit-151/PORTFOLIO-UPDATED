import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowRight, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }
});

function CodeSnippet({ snippet }) {
  if (!snippet) return null;
  // Colorize the code snippet
  const lines = snippet.split('\n');
  return (
    <div className="code-card animate-float">
      <div className="code-card-header">
        <div className="code-dot red" />
        <div className="code-dot yellow" />
        <div className="code-dot green" />
        <span className="code-filename">developer.js</span>
      </div>
      <pre className="code-body">
        {lines.map((line, i) => (
          <div key={i}>{renderCodeLine(line)}</div>
        ))}
      </pre>
    </div>
  );
}

function renderCodeLine(line) {
  const trimmed = line.trim();
  if (trimmed.startsWith('//')) {
    return <span className="code-comment">{line}</span>;
  }

  if (trimmed.startsWith('const developer = {')) {
    return (
      <span>
        <span className="code-keyword">const</span>{' '}
        <span className="code-variable">developer</span>{' '}
        <span className="code-punct">=</span>{' '}
        <span className="code-punct">&#123;</span>
      </span>
    );
  }

  if (trimmed === '};') {
    return <span className="code-punct">&#125;;</span>;
  }

  if (trimmed === 'console.log(developer);') {
    return (
      <span>
        <span className="code-keyword">console.log</span>
        <span className="code-punct">(</span>
        <span className="code-variable">developer</span>
        <span className="code-punct">);</span>
      </span>
    );
  }

  // Handle multiline string continuations (no colon, but has quotes)
  if (!trimmed.includes(':') && (trimmed.includes('"') || trimmed.includes("'"))) {
    return <span className="code-string">{line}</span>;
  }

  if (trimmed.includes(':')) {
    const colonIdx = line.indexOf(':');
    const key = line.slice(0, colonIdx);
    const value = line.slice(colonIdx + 1);

    let formattedVal = value;
    const quoteCount = (value.match(/"/g) || []).length;
    
    if (quoteCount === 1) {
      const firstQuote = value.indexOf('"');
      formattedVal = value.slice(0, firstQuote) + `<span class="code-string">${value.slice(firstQuote)}</span>`;
    } else if (value.includes('"') || value.includes("'")) {
      formattedVal = value.replace(/"([^"]+)"/g, '<span class="code-string">"$1"</span>');
    }

    return (
      <span>
        <span className="code-key">{key}</span>
        <span className="code-punct">:</span>
        <span dangerouslySetInnerHTML={{ __html: formattedVal }} />
      </span>
    );
  }

  return <span>{line}</span>;
}

export default function Hero({ profile }) {
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

  const defaultSnippet = `const developer = {
  name: "${profile?.name || 'Ankit'}",
  role: "${profile?.tagline || 'Full Stack Developer'}",
  skills: ["React", "Node.js", "Python", "PHP"],
  passion: "Building products that solve real problems",
  currently: "Open to exciting opportunities"
};

console.log(developer);`;

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-grid">
          {/* LEFT */}
          <div>
            <motion.div {...fadeUp(0.1)}>
              <div className="hero-badge">
                <div className="hero-badge-dot" />
                {profile?.tagline || 'Full Stack Developer'}
              </div>
            </motion.div>

            <motion.h1 className="hero-title" {...fadeUp(0.2)}>
              Hi, I&apos;m<br />
              <span className="hero-title-name">{profile?.name || 'Ankit'}</span>
            </motion.h1>

            <motion.p className="hero-desc" {...fadeUp(0.3)}>
              {profile?.bio || 'I build intelligent, scalable, and high-performance web applications with modern technologies and clean code.'}
            </motion.p>

            <motion.div className="hero-cta" {...fadeUp(0.4)}>
              <a href="#projects" className="btn btn-primary">
                View Projects <FiArrowRight />
              </a>
              <a href="#contact" className="btn btn-outline">
                Contact Me <FiSend size={14} />
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.5)}>
              <div className="hero-socials">
                <span className="hero-socials-label">Let&apos;s connect</span>
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
                {profile?.twitter && (
                  <a href={profile.twitter} target="_blank" rel="noreferrer" className="social-icon">
                    <FiTwitter />
                  </a>
                )}
                {profile?.email && (
                  <a href={`mailto:${profile.email}`} className="social-icon">
                    <FiMail />
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div className="hero-right" {...fadeUp(0.3)}>
            <CodeSnippet snippet={profile?.hero_code_snippet || defaultSnippet} />
            <div className="hero-toggle-card">
              &lt;/&gt;
            </div>
            <div className="hero-photo-card">
              <div className="hero-photo" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
                {profile?.profile_image ? (
                  <img src={getMediaUrl(profile.profile_image)} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} />
                ) : (
                  <span style={{ fontSize: 64, color: '#60a5fa' }}>👨‍💻</span>
                )}
              </div>
              <div className="hero-photo-badge">
                <div className="hero-photo-dot" />
                Available for work
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
