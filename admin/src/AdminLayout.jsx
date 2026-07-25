import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PhotoEditor from './pages/PhotoEditor';
import ResumeEditor from './pages/ResumeEditor';
import SkillsManager from './pages/SkillsManager';
import ProjectsManager from './pages/ProjectsManager';
import ExperienceManager from './pages/ExperienceManager';
import CertificatesManager from './pages/CertificatesManager';
import AchievementsManager from './pages/AchievementsManager';
import EducationManager from './pages/EducationManager';
import TrainingManager from './pages/TrainingManager';
import Messages from './pages/Messages';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  photo: 'Profile Photo & Bio',
  resume: 'Resume & Links',
  skills: 'Skills Manager',
  projects: 'Projects Manager',
  experience: 'Experience Manager',
  certificates: 'Certificates Manager',
  achievements: 'Achievements Manager',
  education: 'Education Manager',
  training: 'Training Manager',
  messages: 'Messages',
};

const PAGES = {
  dashboard: Dashboard,
  photo: PhotoEditor,
  resume: ResumeEditor,
  skills: SkillsManager,
  projects: ProjectsManager,
  experience: ExperienceManager,
  certificates: CertificatesManager,
  achievements: AchievementsManager,
  education: EducationManager,
  training: TrainingManager,
  messages: Messages,
};

export default function AdminLayout() {
  const [active, setActive] = useState('dashboard');
  const PageComponent = PAGES[active] || Dashboard;

  return (
    <div className="admin-layout">
      <Sidebar active={active} setActive={setActive} />
      <div className="admin-main">
        <div className="admin-topbar">
          <h1 className="admin-topbar-title">{PAGE_TITLES[active]}</h1>
          <div className="admin-topbar-right">
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Portfolio Admin v1.0
            </span>
          </div>
        </div>
        <div className="admin-content">
          <PageComponent />
        </div>
      </div>
    </div>
  );
}
