#!/bin/bash

# API Testing Script for Intern Portal
# Run this script to test all backend endpoints

echo "🧪 Testing Intern Portal API..."
echo "================================="

# Test if backend is running
echo "1. Health Check..."
curl -s http://localhost:5000/health | json_pp || echo "❌ Backend not running"
echo ""

# Test intern data endpoint
echo "2. Testing GET /api/intern..."
curl -s http://localhost:5000/api/intern | json_pp || echo "❌ Failed to fetch intern data"
echo ""

# Test leaderboard endpoint
echo "3. Testing GET /api/leaderboard..."
curl -s http://localhost:5000/api/leaderboard | json_pp || echo "❌ Failed to fetch leaderboard"
echo ""

# Test donation endpoint (POST)
echo "4. Testing POST /api/intern/donations..."
curl -s -X POST http://localhost:5000/api/intern/donations \
  -H "Content-Type: application/json" \
  -d '{"amount": 100}' | json_pp || echo "❌ Failed to post donation"
echo ""

echo "✅ API testing complete!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:5000"
