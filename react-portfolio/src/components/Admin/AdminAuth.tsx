import React, { useState } from 'react';
import './AdminAuth.css';

interface AdminAuthProps {
  onAuth: (token: string) => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onAuth }) => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token.trim()) {
      setError('Please enter a GitHub token');
      return;
    }

    try {
      // Validate token by making a simple API call
      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      if (response.ok) {
        onAuth(token);
      } else {
        setError('Invalid GitHub token. Please check and try again.');
      }
    } catch (err) {
      setError('Failed to authenticate. Please try again.');
    }
  };

  return (
    <div className="admin-auth">
      <div className="auth-container">
        <h1>Admin Dashboard Login</h1>
        <p className="auth-description">
          Enter your GitHub Personal Access Token to manage content.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="token">GitHub Personal Access Token</label>
            <input
              type="password"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxx"
              className="token-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="auth-help">
          <h3>How to create a GitHub token:</h3>
          <ol>
            <li>Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)</li>
            <li>Click "Generate new token (classic)"</li>
            <li>Give it a name and select the "repo" scope</li>
            <li>Click "Generate token" and copy it</li>
            <li>Paste it above to login</li>
          </ol>
          <p className="warning">
            <strong>⚠️ Security Note:</strong> Your token is stored only in your browser session
            and is never sent to any server except GitHub API.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
