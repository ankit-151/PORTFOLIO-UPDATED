require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Profile = require('../models/Profile');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Certificate = require('../models/Certificate');
const Achievement = require('../models/Achievement');
const Education = require('../models/Education');
const Training = require('../models/Training');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ankit-portfolio';

const profileData = {
  name: 'Ankit',
  tagline: 'Full Stack Developer',
  bio: 'I build intelligent, scalable, and high-performance web applications with modern technologies and clean code. A Computer Science student who loves turning ideas into reality, exploring AI, and constantly learning new technologies.',
  email: 'ankitghanghas29@gmail.com',
  phone: '+91 9306992676',
  location: 'Phagwara, Punjab, India',
  availability: 'Open to work',
  freelance: 'Available',
  github: 'https://github.com/ankit-151',
  linkedin: 'https://www.linkedin.com/in/ankit1525',
  twitter: '',
  resume_url: '',
  profile_image: '/profile.jpg',
  hero_code_snippet: `const developer = {
  name: "Ankit",
  role: "Full Stack Developer",
  skills: ["React", "Node.js", "Python", "PHP"],
  passion: "Building products that solve real\n  problems",
  currently: "Open to exciting opportunities"
};

console.log(developer);`,
  stats: [
    { label: 'Years Learning', value: '2+', order: 0 },
    { label: 'Projects Completed', value: '5+', order: 1 },
    { label: 'Certifications', value: '3+', order: 2 },
    { label: 'GitHub Repos', value: '10+', order: 3 }
  ]
};

const skillsData = [
  // Frontend
  { name: 'React.js', category: 'frontend', level: 'Advanced', percentage: 85, icon_color: '#61DAFB', order: 0 },
  { name: 'Next.js', category: 'frontend', level: 'Intermediate', percentage: 70, icon_color: '#000000', order: 1 },
  { name: 'HTML', category: 'frontend', level: 'Advanced', percentage: 90, icon_color: '#E34F26', order: 2 },
  { name: 'CSS', category: 'frontend', level: 'Advanced', percentage: 85, icon_color: '#1572B6', order: 3 },
  { name: 'Tailwind CSS', category: 'frontend', level: 'Advanced', percentage: 80, icon_color: '#06B6D4', order: 4 },
  // Backend
  { name: 'Node.js', category: 'backend', level: 'Advanced', percentage: 82, icon_color: '#339933', order: 0 },
  { name: 'Express.js', category: 'backend', level: 'Advanced', percentage: 80, icon_color: '#000000', order: 1 },
  { name: 'PHP', category: 'backend', level: 'Intermediate', percentage: 65, icon_color: '#777BB4', order: 2 },
  { name: 'REST APIs', category: 'backend', level: 'Advanced', percentage: 83, icon_color: '#FF6B35', order: 3 },
  // Database
  { name: 'MongoDB', category: 'database', level: 'Advanced', percentage: 80, icon_color: '#47A248', order: 0 },
  { name: 'MySQL', category: 'database', level: 'Intermediate', percentage: 70, icon_color: '#4479A1', order: 1 },
  // Languages
  { name: 'JavaScript', category: 'languages', level: 'Advanced', percentage: 87, icon_color: '#F7DF1E', order: 0 },
  { name: 'Python', category: 'languages', level: 'Intermediate', percentage: 72, icon_color: '#3776AB', order: 1 },
  { name: 'Java', category: 'languages', level: 'Intermediate', percentage: 68, icon_color: '#ED8B00', order: 2 },
  { name: 'C++', category: 'languages', level: 'Intermediate', percentage: 70, icon_color: '#00599C', order: 3 },
  { name: 'C', category: 'languages', level: 'Intermediate', percentage: 65, icon_color: '#A8B9CC', order: 4 },
  // Tools
  { name: 'Git', category: 'tools', level: 'Advanced', percentage: 85, icon_color: '#F05032', order: 0 },
  { name: 'Postman', category: 'tools', level: 'Advanced', percentage: 80, icon_color: '#FF6C37', order: 1 },
  { name: 'AWS', category: 'tools', level: 'Beginner', percentage: 50, icon_color: '#FF9900', order: 2 },
  { name: 'Firebase', category: 'tools', level: 'Intermediate', percentage: 65, icon_color: '#FFCA28', order: 3 },
  // AI/ML
  { name: 'OpenAI API', category: 'ai_ml', level: 'Intermediate', percentage: 68, icon_color: '#412991', order: 0 },
  { name: 'Generative AI', category: 'ai_ml', level: 'Intermediate', percentage: 65, icon_color: '#4285F4', order: 1 }
];

const projectsData = [
  {
    title: 'NutriAI',
    description: 'An AI-based nutrition monitoring application that enables users to track calorie intake and receive real-time nutritional analysis. Integrated the OpenAI API to generate personalized meal recommendations and nutritional insights based on user food logs.',
    image: '',
    tags: [
      { name: 'React Native', color: '#61DAFB' },
      { name: 'MongoDB', color: '#47A248' },
      { name: 'Node.js', color: '#339933' },
      { name: 'AI', color: '#9C27B0' }
    ],
    tech_stack: ['JavaScript (ES6+)', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'OpenAI API'],
    live_url: 'https://nutriai-example.vercel.app',
    github_url: 'https://github.com/ankit-151',
    featured: true,
    order: 0
  },
  {
    title: 'Patient Triage Management',
    description: 'A full-stack Patient Triage Management System based on Data Structures and Algorithms to automate patient prioritization. Designed a priority queue-based severity rating system to better schedule emergency patients and decrease response time.',
    image: '',
    tags: [
      { name: 'PHP', color: '#777BB4' },
      { name: 'MySQL', color: '#4479A1' },
      { name: 'Tailwind CSS', color: '#06B6D4' }
    ],
    tech_stack: ['PHP', 'HTML', 'Tailwind CSS', 'MySQL', 'C++'],
    live_url: '',
    github_url: 'https://github.com/ankit-151',
    featured: true,
    order: 1
  }
];

const experienceData = [
  { title: 'Full Stack Developer', company: 'Self-Employed / Freelance', period: '2026 - Present', current: true, order: 0 },
  { title: 'Frontend & Backend', company: 'Full Stack Development', period: '2025', current: false, order: 1 },
  { title: 'Frontend Developer', company: 'Learning & Projects', period: '2024', current: false, order: 2 },
  { title: 'Started Coding', company: 'Self-Study', period: '2023 - 2024', current: false, order: 3 }
];

const certificatesData = [
  {
    title: 'Master Generative AI & Generative AI Tools (ChatGPT & more)',
    issuer: 'Udemy',
    issuer_logo: 'udemy',
    issuer_color: '#A435F0',
    date: 'Aug 2025',
    url: 'https://udemy.com',
    order: 0
  },
  {
    title: 'Cloud Computing',
    issuer: 'NPTEL',
    issuer_logo: 'nptel',
    issuer_color: '#FF5722',
    date: 'Nov 2024',
    url: 'https://nptel.ac.in',
    order: 1
  },
  {
    title: 'Mastering Data Structures and Algorithms',
    issuer: 'Lovely Professional University',
    issuer_logo: 'lpu',
    issuer_color: '#1565C0',
    date: 'Jul 2024',
    url: 'https://lpu.in',
    order: 2
  }
];

const achievementsData = [
  { label: 'LeetCode Problems', value: '100+', icon: 'code', description: 'Solved coding problems on LeetCode', is_stat: true, order: 0 },
  { label: 'GitHub Repos', value: '10+', icon: 'github', description: 'Public repositories on GitHub', is_stat: true, order: 1 },
  { label: 'Projects Completed', value: '5+', icon: 'projects', description: 'Full-stack projects built and deployed', is_stat: true, order: 2 },
  { label: 'Technologies', value: '15+', icon: 'tech', description: 'Technologies and tools mastered', is_stat: true, order: 3 },
  { label: 'Hackathon Top 10', value: '1', icon: 'trophy', description: 'Top 10 position in Code-a-Hunt Hackathon', is_stat: false, order: 4 },
  { label: 'Outlier AI Tasks', value: '50+', icon: 'star', description: 'AI data annotation tasks completed on Outlier (Mar 2025)', is_stat: false, order: 5 }
];

const educationData = [
  {
    institution: 'Lovely Professional University',
    degree: 'Bachelor of Technology',
    field: 'Computer Science and Engineering',
    location: 'Phagwara, Punjab',
    start_date: 'Aug 2023',
    end_date: 'Present',
    percentage_cgpa: 'CGPA: 7.17',
    current: true,
    order: 0
  },
  {
    institution: 'Halwasiya Vidhya Vihar',
    degree: 'Intermediate',
    field: '',
    location: 'Bhiwani, Haryana',
    start_date: 'Mar 2022',
    end_date: 'May 2023',
    percentage_cgpa: '70%',
    current: false,
    order: 1
  },
  {
    institution: 'R.E.D',
    degree: 'Matriculation',
    field: '',
    location: 'Charkhi Dadri, Haryana',
    start_date: 'Mar 2020',
    end_date: 'May 2021',
    percentage_cgpa: '86%',
    current: false,
    order: 2
  }
];

const trainingData = [
  {
    title: 'Mastering Data Structures and Algorithms',
    provider: 'Self-Guided Training',
    type: 'Self-Guided',
    tech_stack: ['C++'],
    start_date: 'Jun 2025',
    end_date: 'Jul 2025',
    highlights: [
      'Implemented fundamental data structures such as Arrays, Linked Lists, Stacks, Queues, Trees, and Graphs using C++.',
      'Acquired proficiency in algorithmic problem-solving through analysis and optimization of algorithms with Big-O notation for time and space complexity.',
      'Improved programming and debugging skills by solving coding problems on online coding platforms.'
    ],
    order: 0
  }
];

async function seed(customUri = null) {
  try {
    if (customUri || MONGODB_URI) {
      await mongoose.connect(customUri || MONGODB_URI);
    }
    console.log('✅ Connected to MongoDB for seeding');

    // Clear existing data
    await Promise.all([
      Profile.deleteMany({}),
      Skill.deleteMany({}),
      Project.deleteMany({}),
      Experience.deleteMany({}),
      Certificate.deleteMany({}),
      Achievement.deleteMany({}),
      Education.deleteMany({}),
      Training.deleteMany({})
    ]);
    console.log('🗑️  Cleared existing data');

    // Seed all collections
    await Profile.create(profileData);
    await Skill.insertMany(skillsData);
    await Project.insertMany(projectsData);
    await Experience.insertMany(experienceData);
    await Certificate.insertMany(certificatesData);
    await Achievement.insertMany(achievementsData);
    await Education.insertMany(educationData);
    await Training.insertMany(trainingData);

    console.log('🌱 Database seeded successfully with Ankit\'s CV data!');
    console.log('📊 Seeded:');
    console.log('   - 1 Profile');
    console.log(`   - ${skillsData.length} Skills`);
    console.log(`   - ${projectsData.length} Projects`);
    console.log(`   - ${experienceData.length} Experience entries`);
    console.log(`   - ${certificatesData.length} Certificates`);
    console.log(`   - ${achievementsData.length} Achievements`);
    console.log(`   - ${educationData.length} Education entries`);
    console.log(`   - ${trainingData.length} Training entries`);
    console.log('\n🔑 Admin credentials:');
    console.log('   Email: admin@portfolio.com');
    console.log('   Password: admin123');
    console.log('\n🚀 Admin panel: http://localhost:5174');
    console.log('🌐 Portfolio:   http://localhost:5173');

    if (require.main === module) {
      process.exit(0);
    }
  } catch (err) {
    console.error('❌ Seed error:', err);
    if (require.main === module) {
      process.exit(1);
    }
    throw err;
  }
}

if (require.main === module) {
  seed();
} else {
  module.exports = { seed, profileData, skillsData, projectsData, experienceData, certificatesData, achievementsData, educationData, trainingData };
}

