const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database (in production, use MongoDB/PostgreSQL)
let users = [
  {
    id: 1,
    name: "Lucky Sharma",
    email: "lucky.sharma@example.com",
    password: "password123",
    referralCode: "luckysharma2025",
    totalDonations: 2647,
    joinDate: "2025-07-01"
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    password: "password123",
    referralCode: "sarahchen2025",
    totalDonations: 4521,
    joinDate: "2025-06-15"
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    email: "mike.rodriguez@example.com",
    password: "password123",
    referralCode: "mikerodriguez2025",
    totalDonations: 3890,
    joinDate: "2025-06-20"
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    password: "password123",
    referralCode: "emmawilson2025",
    totalDonations: 2134,
    joinDate: "2025-06-25"
  },
  {
    id: 5,
    name: "lucky",
    email: "lucky@gmail.com",
    password: "123",
    referralCode: "lucky2025",
    totalDonations: 1287,
    joinDate: "2025-08-01"
  },
  {
    id: 6,
    name: "Dipesh",
    email: "dipesh@gmail.com",
    password: "123",
    referralCode: "dipesh2025",
    totalDonations: 1456,
    joinDate: "2025-08-02"
  }
];

const rewards = [
  { id: 1, name: "Welcome T-shirt", description: "Exclusive intern welcome tee", requiredAmount: 0 },
  { id: 2, name: "Certificate of Excellence", description: "Recognition for outstanding performance", requiredAmount: 1000 },
  { id: 3, name: "Coffee Mug", description: "Premium branded coffee mug", requiredAmount: 2000 },
  { id: 4, name: "Hoodie", description: "Unlock at $3000 donations", requiredAmount: 3000 },
  { id: 5, name: "Laptop Stickers Pack", description: "Unlock at $5000 donations", requiredAmount: 5000 }
];

// Helper function to generate referral code
function generateReferralCode(name) {
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const year = new Date().getFullYear();
  return `${cleanName}${year}`;
}

// Helper function to calculate rank
function calculateRank(userId) {
  const sortedUsers = [...users].sort((a, b) => b.totalDonations - a.totalDonations);
  const userIndex = sortedUsers.findIndex(user => user.id === userId);
  return userIndex !== -1 ? userIndex + 1 : 'NA';
}

// Helper function to get user rewards
function getUserRewards(totalDonations) {
  return rewards.map(reward => ({
    ...reward,
    unlocked: totalDonations >= reward.requiredAmount
  }));
}

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Intern Portal API is running!',
    version: '2.0.0',
    endpoints: [
      'POST /api/auth/register - Register new user',
      'POST /api/auth/login - Login user',
      'GET /api/intern/:id - Get intern data',
      'GET /api/leaderboard - Get leaderboard data',
      'POST /api/intern/:id/donations - Add donation',
      'GET /api/users/:id/export - Export user data'
    ]
  });
});

// Auth Routes
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Create new user with some initial donations to make it more realistic
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password, // In production, hash this
      referralCode: generateReferralCode(name),
      totalDonations: Math.floor(Math.random() * 1500) + 500, // Random amount between $500-$2000
      joinDate: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);

    // Return user without password
    const { password: _, ...userResponse } = newUser;
    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Return user without password
    const { password: _, ...userResponse } = user;
    res.json({
      message: 'Login successful',
      user: userResponse
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Intern Routes
app.get('/api/intern/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userRewards = getUserRewards(user.totalDonations);
    const userRank = calculateRank(userId);
    const rewardsUnlocked = userRewards.filter(r => r.unlocked).length;

    const response = {
      ...user,
      rewards: userRewards,
      rank: userRank,
      rewardsUnlocked
    };

    // Remove password from response
    delete response.password;
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/leaderboard', (req, res) => {
  try {
    const leaderboard = [...users]
      .sort((a, b) => b.totalDonations - a.totalDonations)
      .map((user, index) => ({
        id: user.id,
        name: user.name,
        referralCode: user.referralCode,
        totalDonations: user.totalDonations,
        rank: index + 1
      }));

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/intern/:id/donations', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid donation amount is required' });
    }

    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.totalDonations += amount;

    res.json({
      message: 'Donation added successfully',
      newTotal: user.totalDonations,
      rank: calculateRank(userId)
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export user data (for downloading)
app.get('/api/users/:id/export', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userRewards = getUserRewards(user.totalDonations);
    const userRank = calculateRank(userId);

    const exportData = {
      personalInfo: {
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
        joinDate: user.joinDate,
        currentRank: userRank
      },
      fundraisingData: {
        totalDonations: user.totalDonations,
        rewardsUnlocked: userRewards.filter(r => r.unlocked).length,
        totalRewards: userRewards.length
      },
      rewards: userRewards,
      exportDate: new Date().toISOString()
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${user.name.replace(/\s+/g, '_')}_intern_data.json"`);
    res.json(exportData);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}`);
  console.log(`🔗 Endpoints:`);
  console.log(`   POST /api/auth/register`);
  console.log(`   POST /api/auth/login`);
  console.log(`   GET  /api/intern/:id`);
  console.log(`   GET  /api/leaderboard`);
  console.log(`   POST /api/intern/:id/donations`);
  console.log(`   GET  /api/users/:id/export`);
});
