const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://assignment1-shecanfoundation.netlify.app',
  credentials: true
}));

app.use(express.json());

// Dummy data
const internData = {
  id: 1,
  name: "Lucky Sharma",
  email: "lucky.sharma@example.com",
  referralCode: "luckysharma2025",
  totalDonations: 2647,
  rewards: [
    { id: 1, name: "Welcome T-shirt", unlocked: true, description: "Exclusive intern welcome tee" },
    { id: 2, name: "Certificate of Excellence", unlocked: true, description: "Recognition for outstanding performance" },
    { id: 3, name: "Coffee Mug", unlocked: true, description: "Premium branded coffee mug" },
    { id: 4, name: "Hoodie", unlocked: false, description: "Unlock at $3000 donations", requiredAmount: 3000 },
    { id: 5, name: "Laptop Stickers Pack", unlocked: false, description: "Unlock at $5000 donations", requiredAmount: 5000 }
  ],
  joinDate: "2025-07-01"
};

const leaderboardData = [
  { id: 1, name: "Sarah Chen", referralCode: "sarahchen2025", totalDonations: 4521, rank: 1 },
  { id: 2, name: "Mike Rodriguez", referralCode: "mikerodriguez2025", totalDonations: 3890, rank: 2 },
  { id: 3, name: "Lucky Sharma", referralCode: "luckysharma2025", totalDonations: 2647, rank: 3 },
  { id: 4, name: "Emma Wilson", referralCode: "emmawilson2025", totalDonations: 2134, rank: 4 },
  { id: 5, name: "David Kim", referralCode: "davidkim2025", totalDonations: 1876, rank: 5 },
  { id: 6, name: "Lisa Brown", referralCode: "lisabrown2025", totalDonations: 1543, rank: 6 },
  { id: 7, name: "James Taylor", referralCode: "jamestaylor2025", totalDonations: 1298, rank: 7 },
  { id: 8, name: "Rachel Green", referralCode: "rachelgreen2025", totalDonations: 987, rank: 8 }
];

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Intern Portal API is running!',
    version: '1.0.0',
    endpoints: [
      'GET /api/intern - Get intern data',
      'GET /api/leaderboard - Get leaderboard data'
    ]
  });
});

// Get intern data
app.get('/api/intern', (req, res) => {
  try {
    res.json({
      success: true,
      data: internData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching intern data',
      error: error.message
    });
  }
});

// Get leaderboard data
app.get('/api/leaderboard', (req, res) => {
  try {
    res.json({
      success: true,
      data: leaderboardData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching leaderboard data',
      error: error.message
    });
  }
});

// Update donations (bonus feature)
app.post('/api/intern/donations', (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid donation amount'
      });
    }

    internData.totalDonations += amount;
    
    // Update rewards based on new total
    internData.rewards.forEach(reward => {
      if (reward.requiredAmount && internData.totalDonations >= reward.requiredAmount) {
        reward.unlocked = true;
      }
    });

    res.json({
      success: true,
      message: 'Donation recorded successfully',
      data: internData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error recording donation',
      error: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}`);
  console.log(`🔗 Endpoints:`);
  console.log(`   GET  /api/intern`);
  console.log(`   GET  /api/leaderboard`);
  console.log(`   POST /api/intern/donations`);
});
