# API Testing Script for Intern Portal (PowerShell)
# Run this script to test all backend endpoints

Write-Host "🧪 Testing Intern Portal API..." -ForegroundColor Cyan
Write-Host "================================="

# Test if backend is running
Write-Host "1. Health Check..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/health" -UseBasicParsing
    Write-Host "✅ Backend is running!" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Backend not running" -ForegroundColor Red
}
Write-Host ""

# Test intern data endpoint
Write-Host "2. Testing GET /api/intern..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/intern" -UseBasicParsing
    Write-Host "✅ Intern data retrieved!" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Failed to fetch intern data" -ForegroundColor Red
}
Write-Host ""

# Test leaderboard endpoint
Write-Host "3. Testing GET /api/leaderboard..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/leaderboard" -UseBasicParsing
    Write-Host "✅ Leaderboard data retrieved!" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Failed to fetch leaderboard" -ForegroundColor Red
}
Write-Host ""

# Test donation endpoint (POST)
Write-Host "4. Testing POST /api/intern/donations..." -ForegroundColor Yellow
try {
    $body = @{ amount = 100 } | ConvertTo-Json
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/intern/donations" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
    Write-Host "✅ Donation posted successfully!" -ForegroundColor Green
    $response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Failed to post donation" -ForegroundColor Red
}
Write-Host ""

Write-Host "API testing complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Blue
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Blue
