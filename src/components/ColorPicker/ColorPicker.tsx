import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';
import './ColorPicker.css';

const ColorPicker = () => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    ['--accent-color', '--accent-color-light', '--accent-hover', '--focus-color', '--accent-rgb'].forEach(
      (prop) => root.style.removeProperty(prop)
    );
    localStorage.removeItem('primaryColor');
  }, []);

  return (
    <button type="button"
      className="color-picker-toggle"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      data-tooltip={theme === 'light' ? 'Dark mode' : 'Light mode'}
    >
      <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
    </button>
  );
};

export default ColorPicker;
