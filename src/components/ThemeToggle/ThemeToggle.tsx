import { useEffect } from 'react';
import Icon from '../Icon/Icon';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    ['--accent-color', '--accent-color-light', '--accent-hover', '--focus-color', '--accent-rgb'].forEach(
      (prop) => root.style.removeProperty(prop)
    );
    localStorage.removeItem('primaryColor');
  }, []);

  return (
    <button
      type="button"
      className="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      data-tooltip={theme === 'light' ? 'Dark mode' : 'Light mode'}
    >
      <Icon
        icon={theme === 'light' ? faMoon : faSun}
        className="theme-toggle-icon"
      />
    </button>
  );
};

export default ThemeToggle;
