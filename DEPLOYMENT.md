# 🚀 Deployment Guide

## Quick Deploy to Render + Netlify

### Backend Deployment (Render)

1. **Create a Render Account** at [render.com](https://render.com)

2. **Connect your GitHub repository**

3. **Create a new Web Service** with these settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     ```
     NODE_ENV=production
     PORT=10000
     ```

4. **Deploy** - Your backend will be available at: `https://your-app-name.onrender.com`

### Frontend Deployment (Netlify)

1. **Update API URL** in frontend code:
   ```javascript
   // In Dashboard.js and Leaderboard.js, replace:
   const API_BASE_URL = 'http://localhost:5000';
   // With your Render URL:
   const API_BASE_URL = 'https://your-app-name.onrender.com';
   ```

2. **Build the frontend**:
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `build` folder
   - Or connect your GitHub repo and set:
     - **Build command**: `npm run build`
     - **Publish directory**: `build`
     - **Base directory**: `frontend`

## Alternative: Manual Hosting

### Frontend (GitHub Pages)
1. Build the project: `npm run build`
2. Upload the `build` folder contents to GitHub Pages
3. Update API URLs to point to your hosted backend

### Backend (Railway)
1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Deploy: `railway deploy`

## Environment Setup for Production

### Backend .env (Production)
```
NODE_ENV=production
PORT=10000
```

### CORS Configuration
Make sure your backend CORS is configured for your frontend domain:
```javascript
app.use(cors({
  origin: ['https://your-netlify-domain.netlify.app', 'http://localhost:3000']
}));
```

## Testing Your Deployment

1. **Backend Health Check**: Visit `https://your-backend-url.onrender.com/health`
2. **API Test**: Visit `https://your-backend-url.onrender.com/api/intern`
3. **Frontend Test**: Visit your Netlify URL and test all functionality

## Common Issues & Solutions

### CORS Errors
- Update CORS configuration in backend
- Ensure frontend is using HTTPS if backend is HTTPS

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Clear npm cache if needed

### API Connection Issues
- Verify backend URL is correct in frontend
- Check that backend is running and accessible
- Test API endpoints directly in browser

---

**Your full stack intern portal is now live! 🎉**
