# 🎯 Intern Portal - Full Stack Fundraising Dashboard

A modern, full-stack web application for intern fundraising management, built with **Node.js/Express** backend and **React** frontend.

## 📋 Project Overview

This intern portal provides a comprehensive dashboard for managing fundraising activities, tracking donations, and viewing leaderboards. Perfect for internship programs with donation/referral components.

## ✨ Features

### 🎨 Frontend (React)
- **Professional Login/Signup Pages** - Corporate-grade UI with modern design system
- **Executive Dashboard** featuring:
  - Clean, professional layout with enterprise-style cards
  - Sophisticated color palette (blues, grays, professional tones)
  - Business-appropriate typography and spacing
  - Intern profile information with professional presentation
  - Personalized referral code with secure copy functionality
  - Real-time donation tracking with currency formatting
  - Professional rewards/unlockables system with milestone tracking
- **Executive Leaderboard** - Corporate-style competitive rankings
- **Responsive Design** - Optimized for desktop and mobile business use
- **Enterprise UI/UX** - Professional shadows, clean lines, business-appropriate animations

### 🚀 Backend (Node.js + Express)
- **RESTful API** with the following endpoints:
  - `GET /api/intern` - Fetch intern profile data
  - `GET /api/leaderboard` - Retrieve leaderboard rankings
  - `POST /api/intern/donations` - Record new donations (bonus feature)
- **CORS enabled** for frontend-backend communication
- **Error handling** with structured JSON responses
- **Health check endpoint** for monitoring

### 🎁 Bonus Features
- **Dynamic Rewards System** - Unlocks based on donation milestones
- **Leaderboard Rankings** - Real-time competitive standings
- **Data Persistence** - Dummy data stored in backend memory
- **Copy-to-clipboard** functionality for referral codes
- **Loading states and error handling** throughout the app

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with gradients and animations

## 📁 Project Structure

```
intern-portal/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js & Login.css
│   │   │   ├── Dashboard.js & Dashboard.css
│   │   │   └── Leaderboard.js & Leaderboard.css
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd intern-portal
```

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
**Backend will run on:** http://localhost:5000

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
**Frontend will run on:** http://localhost:3000

### 4. Access the Application
1. Open your browser to http://localhost:3000
2. Use the dummy login (any email/password works)
3. Explore the dashboard and leaderboard!

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

## 📱 Screenshots

### Login Page
- Clean, modern design with toggle between login/signup
- Gradient background with card-based layout
- Demo mode notification

### Dashboard
- Welcome section with personalized greeting
- Three main stat cards showing:
  - Total donations raised (with currency formatting)
  - Referral code (with copy functionality)
  - Rewards unlocked count
- Rewards grid showing locked/unlocked items
- Progress section with account information

### Leaderboard
- Top 3 podium display with medal rankings
- Comprehensive table with all participants
- Current user highlighting
- Summary statistics cards

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

## 🌐 Deployment Options

### Frontend Hosting
- **Vercel** - Recommended for React apps
- **Netlify** - Great for static sites
- **GitHub Pages** - Free option for demos

### Backend Hosting
- **Render** - Free tier available
- **Railway** - Modern platform with Git integration
- **Cyclic** - Serverless deployment
- **Heroku** - Traditional PaaS option

### Environment Variables
For production deployment, set:
```
PORT=5000
NODE_ENV=production
```

## 🎨 Customization

### Updating Dummy Data
Edit the `internData` and `leaderboardData` objects in `backend/server.js` to customize:
- User information
- Donation amounts
- Rewards and unlocking criteria
- Leaderboard participants

### Styling
- Modify CSS files in `frontend/src/components/` for component-specific styles
- Update `frontend/src/App.css` for global styles
- Customize color schemes by changing gradient values

### Adding Features
- **Real Authentication**: Integrate with Firebase Auth or Auth0
- **Database**: Connect to MongoDB, PostgreSQL, or Firebase
- **Real-time Updates**: Add WebSocket support
- **Email Notifications**: Integrate with SendGrid or similar

## 🐛 Troubleshooting

### Backend Connection Issues
- Ensure backend is running on port 5000
- Check CORS configuration
- Verify API endpoints in browser: http://localhost:5000/api/intern

### Frontend Build Issues
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check React version compatibility

### Common Errors
- **CORS Error**: Make sure backend includes CORS middleware
- **Module Not Found**: Verify all dependencies are installed
- **Port In Use**: Change port in backend/.env file

## 👥 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit changes: `git commit -am 'Add new feature'`
5. Push to branch: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

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

## 📞 Support

For questions or support, please open an issue on GitHub or contact the development team.

**Happy fundraising! 🎉**
