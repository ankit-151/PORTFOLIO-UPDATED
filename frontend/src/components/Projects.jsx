import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const PROJECT_EMOJIS = ['🚀', '🤖', '💊', '🛒', '📊', '🔐', '🎯', '🌐'];

function ProjectCard({ project, index }) {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="project-img">
        {project.image ? (
          <img src={project.image} alt={project.title} />
        ) : (
          <span>{PROJECT_EMOJIS[index % PROJECT_EMOJIS.length]}</span>
        )}
        <div className="project-img-overlay">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noreferrer" className="project-img-btn">
              <FiExternalLink size={14} /> Live Demo
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noreferrer" className="project-img-btn">
              <FiGithub size={14} /> GitHub
            </a>
          )}
        </div>
      </div>

      <div className="project-body">
        <div className="project-tags">
          {(project.tags || []).map((tag, i) => (
            <span
              key={i}
              className="project-tag"
              style={{ background: `${tag.color}20`, color: tag.color }}
            >
              {tag.name}
            </span>
          ))}
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <div className="project-links">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noreferrer" className="project-link demo">
              <FiExternalLink size={13} /> Live Demo
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noreferrer" className="project-link github">
              <FiGithub size={13} /> GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ projects = [] }) {
  const featured = projects.filter(p => p.featured);
  const display = featured.length > 0 ? featured : projects;

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="projects-header">
          <div>
            <span className="section-label">Featured Projects</span>
            <h2 className="section-title">Some things I&apos;ve <span>built</span></h2>
          </div>
          {projects.length > 3 && (
            <a href="#all-projects" className="view-all">
              View All Projects <FiArrowRight />
            </a>
          )}
        </div>

        <div className="projects-grid">
          {display.map((project, i) => (
            <ProjectCard key={project._id || i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
