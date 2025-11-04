import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
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

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    // Apply theme
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
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
        <div className="mobile-header-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
          </button>
          <button onClick={handleLogout} className="logout-btn-mobile">
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Content</h2>
          <div className="sidebar-header-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            >
              <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
            </button>
            <button onClick={handleLogout} className="logout-btn-desktop">
              Logout
            </button>
          </div>
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
