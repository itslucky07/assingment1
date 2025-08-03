import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [internData, setInternData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const API_BASE_URL = 'https://assingment1-1.onrender.com';

  useEffect(() => {
    // Check if user is logged in
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
      navigate('/');
      return;
    }
    
    const user = JSON.parse(storedUserData);
    setUserData(user);
    fetchInternData(user.id);
  }, [navigate]);

  const fetchInternData = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/intern/${userId}`);
      setInternData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load data. Make sure the backend server is running.');
      console.error('Error fetching intern data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/');
  };

  const handleDownload = async () => {
    if (!userData) return;
    
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/${userData.id}/export`);
      
      // Create blob and download
      const blob = new Blob([JSON.stringify(response.data, null, 2)], {
        type: 'application/json'
      });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${userData.name.replace(/\s+/g, '_')}_intern_data.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      alert('Data downloaded successfully!');
    } catch (error) {
      alert('Failed to download data. Please try again.');
      console.error('Download error:', error);
    }
  };

  const copyReferralCode = () => {
    if (internData?.referralCode) {
      navigator.clipboard.writeText(internData.referralCode);
      alert('Referral code copied to clipboard!');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error">
          <h2>⚠️ Connection Error</h2>
          <p>{error}</p>
          <button onClick={() => fetchInternData(userData?.id)} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h1> Intern Portal</h1>
        <div className="nav-actions">
          <button 
            onClick={() => navigate('/leaderboard')}
            className="nav-btn"
          >
            🏆 Leaderboard
          </button>
          <button 
            onClick={handleDownload}
            className="nav-btn"
          >
            📥 Download Data
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome back, {internData?.name}! 👋</h2>
          <p>Here's your fundraising progress overview</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card primary">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>Total Donations Raised</h3>
              <p className="stat-value">{formatCurrency(internData?.totalDonations)}</p>
            </div>
          </div>

          <div className="stat-card secondary">
            <div className="stat-icon">🔗</div>
            <div className="stat-content">
              <h3>Your Referral Code</h3>
              <p className="stat-value referral-code">
                {internData?.referralCode}
                <button onClick={copyReferralCode} className="copy-btn">
                  📋
                </button>
              </p>
            </div>
          </div>

          <div className="stat-card tertiary">
            <div className="stat-icon">�</div>
            <div className="stat-content">
              <h3>Current Rank</h3>
              <p className="stat-value">
                #{internData?.rank || 'NA'}
              </p>
            </div>
          </div>

          <div className="stat-card tertiary">
            <div className="stat-icon">�🎁</div>
            <div className="stat-content">
              <h3>Rewards Unlocked</h3>
              <p className="stat-value">
                {internData?.rewards?.filter(reward => reward.unlocked).length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="rewards-section">
          <h3>🎁 Rewards & Unlockables</h3>
          <div className="rewards-grid">
            {internData?.rewards?.map(reward => (
              <div 
                key={reward.id} 
                className={`reward-card ${reward.unlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="reward-status">
                  {reward.unlocked ? '✅' : '🔒'}
                </div>
                <h4>{reward.name}</h4>
                <p>{reward.description}</p>
                {!reward.unlocked && reward.requiredAmount && (
                  <div className="unlock-requirement">
                    Unlock at {formatCurrency(reward.requiredAmount)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="progress-section">
          <h3>📈 Progress Overview</h3>
          <div className="progress-info">
            <p>You've been doing great! Keep sharing your referral code to unlock more rewards.</p>
            <p><strong>Joined:</strong> {internData?.joinDate}</p>
            <button onClick={fetchInternData} className="refresh-btn">
              🔄 Refresh Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
