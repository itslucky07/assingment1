import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_BASE_URL = 'https://assingment1-1.onrender.com';

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/leaderboard`);
      setLeaderboardData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load leaderboard. Make sure the backend server is running.');
      console.error('Error fetching leaderboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getRankEmoji = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard-container">
        <div className="error">
          <h2>⚠️ Connection Error</h2>
          <p>{error}</p>
          <button onClick={fetchLeaderboardData} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <nav className="leaderboard-nav">
        <button 
          onClick={() => navigate('/dashboard')}
          className="back-btn"
        >
          ← Back to Dashboard
        </button>
        <h1>🏆 Fundraising Leaderboard</h1>
      </nav>

      <div className="leaderboard-content">
        <div className="leaderboard-header">
          <h2>Top Fundraisers</h2>
          <p>See how you stack up against other interns!</p>
        </div>

        <div className="podium">
          {leaderboardData.slice(0, 3).map((intern) => (
            <div 
              key={intern.id} 
              className={`podium-position position-${intern.rank}`}
            >
              <div className="podium-rank">{getRankEmoji(intern.rank)}</div>
              <div className="podium-info">
                <h3>{intern.name}</h3>
                <p className="podium-amount">{formatCurrency(intern.totalDonations)}</p>
                <p className="podium-code">{intern.referralCode}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="leaderboard-table">
          <div className="table-header">
            <div className="header-rank">Rank</div>
            <div className="header-name">Name</div>
            <div className="header-code">Referral Code</div>
            <div className="header-amount">Total Raised</div>
          </div>
          
          {leaderboardData.map((intern) => (
            <div 
              key={intern.id} 
              className={`table-row ${intern.name === 'Alex Johnson' ? 'current-user' : ''}`}
            >
              <div className="cell-rank">
                <span className="rank-badge">
                  {getRankEmoji(intern.rank)} #{intern.rank}
                </span>
              </div>
              <div className="cell-name">
                {intern.name}
                {intern.name === 'Alex Johnson' && <span className="you-badge">You</span>}
              </div>
              <div className="cell-code">{intern.referralCode}</div>
              <div className="cell-amount">{formatCurrency(intern.totalDonations)}</div>
            </div>
          ))}
        </div>

        <div className="leaderboard-footer">
          <div className="stats-summary">
            <div className="summary-card">
              <h4>Your Position</h4>
              <p>#{leaderboardData.find(intern => intern.name === 'Alex Johnson')?.rank || 'N/A'}</p>
            </div>
            <div className="summary-card">
              <h4>Total Participants</h4>
              <p>{leaderboardData.length}</p>
            </div>
            <div className="summary-card">
              <h4>Top Fundraiser</h4>
              <p>{formatCurrency(leaderboardData[0]?.totalDonations || 0)}</p>
            </div>
          </div>
          
          <button onClick={fetchLeaderboardData} className="refresh-btn">
            🔄 Refresh Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
