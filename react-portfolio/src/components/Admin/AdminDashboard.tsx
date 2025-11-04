import React, { useState, useEffect } from 'react';
import AdminAuth from './AdminAuth';
import AdminEditor from './AdminEditor';
import './AdminDashboard.css';

interface AdminDashboardProps {}

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const [token, setToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('publications');
  const [saveStatus, setSaveStatus] = useState<string>('');

  useEffect(() => {
    // Check if token exists in sessionStorage
    const savedToken = sessionStorage.getItem('github_token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuth = (githubToken: string) => {
    setToken(githubToken);
    setIsAuthenticated(true);
    sessionStorage.setItem('github_token', githubToken);
  };

  const handleLogout = () => {
    setToken('');
    setIsAuthenticated(false);
    sessionStorage.removeItem('github_token');
  };

  const tabs = [
    { id: 'publications', label: 'Publications' },
    { id: 'education', label: 'Education' },
    { id: 'research', label: 'Research Experience' },
    { id: 'teaching', label: 'Teaching' },
    { id: 'news', label: 'News' },
    { id: 'awards', label: 'Awards' },
    { id: 'research-interests', label: 'Research Interests' },
  ];

  if (!isAuthenticated) {
    return <AdminAuth onAuth={handleAuth} />;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Content Management Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {saveStatus && (
        <div className={`save-status ${saveStatus.includes('Error') ? 'error' : 'success'}`}>
          {saveStatus}
        </div>
      )}

      <div className="admin-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="admin-content">
        <AdminEditor
          contentType={activeTab}
          token={token}
          onSaveStatus={setSaveStatus}
        />
      </div>

      <div className="admin-footer">
        <p>
          <strong>Note:</strong> Changes are saved directly to your GitHub repository.
          After saving, you may need to rebuild your site for changes to appear.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
