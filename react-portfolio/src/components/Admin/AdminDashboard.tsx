import React, { useState, useEffect } from 'react';
import AdminAuth from './AdminAuth';
import FormBasedEditor from './FormBasedEditor';
import './AdminDashboard.css';

interface AdminDashboardProps {}

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const [token, setToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('publications');
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      {/* Mobile Header */}
      <div className="admin-mobile-header">
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
            <path d="M3 6h14M3 10h14M3 14h14" strokeWidth="2" strokeLinecap="square"/>
          </svg>
        </button>
        <h1>Admin</h1>
        <button onClick={handleLogout} className="logout-btn-mobile">
          Logout
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Content</h2>
          <button onClick={handleLogout} className="logout-btn-desktop">
            Logout
          </button>
        </div>

        <nav className="sidebar-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`sidebar-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                setSidebarOpen(false);
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="admin-main">
        {saveStatus && (
          <div className={`save-status ${saveStatus.includes('Error') ? 'error' : 'success'}`}>
            {saveStatus}
          </div>
        )}

        <div className="admin-content">
          <FormBasedEditor
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
      </main>
    </div>
  );
};

export default AdminDashboard;
