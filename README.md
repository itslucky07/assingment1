# 🎯 Intern Portal - Full Stack Fundraising Dashboard

A professional full-stack dashboard for internship fundraising programs, allowing interns to track donations, unlock rewards, and view real-time leaderboards.

---

## 📋 Project Overview

This intern portal provides a comprehensive dashboard for managing fundraising activities, tracking donations, and viewing leaderboards. It's ideal for internship programs with donation and referral components, combining a modern React frontend with a robust Node.js/Express backend.

---

## ✨ Features

### 🎨 Frontend (React)
- **Professional Login/Signup Pages**: Corporate-grade UI with a modern design system
- **Executive Dashboard**:
  - Clean, professional layout with enterprise-style cards
  - Sophisticated color palette and typography
  - Intern profile information with secure referral code copy
  - Real-time donation tracking
  - Rewards/unlockables system with milestone tracking
- **Executive Leaderboard**: Competitive rankings with current user highlighting
- **Responsive Design**: Optimized for desktop and mobile
- **Enterprise UI/UX**: Clean lines, business-appropriate animations

### 🚀 Backend (Node.js + Express)
- **RESTful API**:
  - `GET /api/intern` - Fetch intern profile data
  - `GET /api/leaderboard` - Retrieve leaderboard rankings
  - `POST /api/intern/donations` - Record new donations (bonus feature)
- **CORS enabled** for frontend-backend communication
- **Error handling** with structured JSON responses
- **Health check endpoint** for monitoring

### 🎁 Bonus Features
- **Dynamic Rewards System**: Unlocks based on donation milestones ($1000, $2000, $3000, $5000)
- **Leaderboard Rankings**: Real-time competitive standings
- **Data Persistence**: Dummy data stored in backend memory
- **Copy-to-clipboard** for referral codes
- **Loading states and error handling** throughout the app

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd assingment1
```

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
Backend runs on: http://localhost:5000

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend runs on: http://localhost:3000

### 4. Access the Application
1. Open your browser to http://localhost:3000
2. Use any email/password to login (dummy login for demo)
3. Explore the dashboard and leaderboard!

---

## 📊 API Endpoints

### GET /api/intern
Returns intern profile data:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Alex Johnson",
    "email": "alex.johnson@example.com",
    "referralCode": "alexjohnson2025",
    "totalDonations": 2547,
    "rewards": [...],
    "joinDate": "2025-07-01"
  }
}
```

### GET /api/leaderboard
Returns leaderboard rankings:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Sarah Chen",
      "referralCode": "sarahchen2025",
      "totalDonations": 4521,
      "rank": 1
    },
    ...
  ]
}
```

### POST /api/intern/donations
Record a new donation:
```json
{
  "amount": 100
}
```

---

## 📱 Screenshots

### Login Page
- Clean, modern design with login/signup toggle
- Gradient background and card-based layout

### Dashboard
- Personalized greeting
- Stat cards for donations, referral code, rewards unlocked
- Rewards grid showing locked/unlocked items

### Leaderboard
- Top 3 podium with medals
- Table of all participants, current user highlighted

---

## 🔧 Development Scripts

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Frontend
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

---

## 🐛 Troubleshooting

### Backend Connection Issues
- Ensure backend is running on port 5000
- Check CORS configuration
- Verify API endpoints: http://localhost:5000/api/intern

### Frontend Build Issues
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check React version compatibility

### Common Errors
- **CORS Error**: Ensure backend includes CORS middleware
- **Module Not Found**: Verify all dependencies are installed
- **Port In Use**: Change port in backend/.env file

---

## 🔮 Future Enhancements

- [ ] Real user authentication system
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Email notifications for milestones
- [ ] Advanced analytics dashboard
- [ ] Mobile app version
- [ ] Social media sharing integration
- [ ] Automated reward distribution
- [ ] Multi-tenant support for different organizations

---

## 👥 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit changes: `git commit -am 'Add new feature'`
5. Push to branch: `git push origin feature-name`
6. Submit a pull request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📞 Support

For questions or support, please open an issue on GitHub or contact the development team.

**Happy fundraising! 🎉**
