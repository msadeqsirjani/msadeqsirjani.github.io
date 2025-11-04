import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoon,
  faSun,
  faFileLines,
  faGraduationCap,
  faFlask,
  faChalkboardTeacher,
  faNewspaper,
  faTrophy,
  faLightbulb,
  faBars,
  faChevronLeft,
  faChevronRight,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
    { id: 'publications', label: 'Publications', icon: faFileLines },
    { id: 'education', label: 'Education', icon: faGraduationCap },
    { id: 'research', label: 'Research Experience', icon: faFlask },
    { id: 'teaching', label: 'Teaching', icon: faChalkboardTeacher },
    { id: 'news', label: 'News', icon: faNewspaper },
    { id: 'awards', label: 'Awards', icon: faTrophy },
    { id: 'research-interests', label: 'Research Interests', icon: faLightbulb },
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
          <FontAwesomeIcon icon={faBars} />
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
            <FontAwesomeIcon icon={faRightFromBracket} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''} ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {/* Collapse Toggle Button - Top Right Corner - Desktop Only */}
        <button
          className="sidebar-collapse-toggle desktop-only-collapse"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <FontAwesomeIcon icon={sidebarCollapsed ? faChevronRight : faChevronLeft} />
        </button>

        <div className="sidebar-header">
          {!sidebarCollapsed && (
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
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span>Logout</span>
              </button>
            </div>
          )}
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
              title={sidebarCollapsed ? tab.label : ''}
            >
              <FontAwesomeIcon icon={tab.icon} className="sidebar-icon" />
              {!sidebarCollapsed && <span>{tab.label}</span>}
            </button>
          ))}
        </nav>

        {/* Profile at bottom */}
        <div className="admin-profile">
          <img
            src="/assets/img/profile.webp"
            alt="Mohammad Sadegh Sirjani"
            className="admin-avatar"
          />
          {!sidebarCollapsed && (
            <div className="admin-info">
              <h3>Mohammad Sadegh Sirjani</h3>
              <p>Administrator</p>
            </div>
          )}
        </div>
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
