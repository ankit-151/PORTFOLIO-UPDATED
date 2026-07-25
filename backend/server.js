require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    process.env.ADMIN_URL || 'http://localhost:5174'
  ],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/certificates', require('./routes/certificates'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/education', require('./routes/education'));
app.use('/api/training', require('./routes/training'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/upload', require('./routes/upload'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Ankit Portfolio API is running' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || 'Server Error' });
});

// MongoDB connection & Memory Fallback
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 2000
    });
    console.log('✅ MongoDB connected');
    
    // Auto seed if empty
    const Profile = require('./models/Profile');
    const profileExists = await Profile.findOne();
    if (!profileExists) {
      console.log('🌱 Database is empty. Seeding Ankit\'s CV data...');
      const { seed } = require('./seed/seed');
      await seed(process.env.MONGODB_URI);
    }
  } catch (err) {
    console.log('⚠️ Local MongoDB connection failed. Starting memory database fallback...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server-global');
      const mongoServer = await MongoMemoryServer.create();
      const memoryUri = mongoServer.getUri();
      console.log(`🧠 In-Memory MongoDB Server started: ${memoryUri}`);
      
      await mongoose.connect(memoryUri);
      console.log('✅ Connected to In-Memory MongoDB');
      
      // Seed memory server
      const { seed } = require('./seed/seed');
      await seed(memoryUri);
    } catch (fallbackErr) {
      console.error('❌ Failed to start in-memory MongoDB server fallback:', fallbackErr);
      process.exit(1);
    }
  }
};

connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
  });
});
