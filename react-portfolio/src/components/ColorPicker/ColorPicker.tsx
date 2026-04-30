import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMoon, faSun, faPalette } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';
import './ColorPicker.css';

interface ColorPalette {
  name: string;
  light: { accent: string; accentHover: string; focus: string };
  dark: { accent: string; accentHover: string; focus: string };
}

const colorPalettes: ColorPalette[] = [
  {
    name: 'Blue',
    light: { accent: '#1e40af', accentHover: '#1e3a8a', focus: '#2563eb' },
    dark: { accent: '#60a5fa', accentHover: '#93c5fd', focus: '#93c5fd' }
  },
  {
    name: 'Purple',
    light: { accent: '#7c3aed', accentHover: '#6d28d9', focus: '#8b5cf6' },
    dark: { accent: '#a78bfa', accentHover: '#c4b5fd', focus: '#c4b5fd' }
  },
  {
    name: 'Green',
    light: { accent: '#059669', accentHover: '#047857', focus: '#10b981' },
    dark: { accent: '#34d399', accentHover: '#6ee7b7', focus: '#6ee7b7' }
  },
  {
    name: 'Red',
    light: { accent: '#dc2626', accentHover: '#b91c1c', focus: '#ef4444' },
    dark: { accent: '#f87171', accentHover: '#fca5a5', focus: '#fca5a5' }
  },
  {
    name: 'Orange',
    light: { accent: '#ea580c', accentHover: '#c2410c', focus: '#f97316' },
    dark: { accent: '#fb923c', accentHover: '#fdba74', focus: '#fdba74' }
  },
  {
    name: 'Teal',
    light: { accent: '#0d9488', accentHover: '#0f766e', focus: '#14b8a6' },
    dark: { accent: '#2dd4bf', accentHover: '#5eead4', focus: '#5eead4' }
  },
  {
    name: 'Pink',
    light: { accent: '#db2777', accentHover: '#be185d', focus: '#ec4899' },
    dark: { accent: '#f472b6', accentHover: '#f9a8d4', focus: '#f9a8d4' }
  },
  {
    name: 'Indigo',
    light: { accent: '#4f46e5', accentHover: '#4338ca', focus: '#6366f1' },
    dark: { accent: '#818cf8', accentHover: '#a5b4fc', focus: '#a5b4fc' }
  }
];

const ColorPicker = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('Blue');
  const modalRef = useRef<HTMLDivElement>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result || !result[1] || !result[2] || !result[3]) return null;
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };
  };

  const applyColorPalette = (colorName: string) => {
    const palette = colorPalettes.find(p => p.name === colorName);
    if (!palette) return;

    const root = document.documentElement;
    const colors = theme === 'light' ? palette.light : palette.dark;

    root.style.setProperty('--accent-color', colors.accent);
    root.style.setProperty('--accent-color-light', palette.light.accent);
    root.style.setProperty('--accent-hover', colors.accentHover);
    root.style.setProperty('--focus-color', colors.focus);

    const accentRgb = hexToRgb(colors.accent);
    if (accentRgb) {
      root.style.setProperty('--accent-rgb', `${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}`);
    }
  };

  useEffect(() => {
    const savedColor = localStorage.getItem('primaryColor') || 'Blue';
    setSelectedColor(savedColor);
    applyColorPalette(savedColor);
  }, []);

  useEffect(() => {
    applyColorPalette(selectedColor);
  }, [theme, selectedColor]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName);
    localStorage.setItem('primaryColor', colorName);
    applyColorPalette(colorName);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, colorName: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleColorSelect(colorName);
    }
  };

  const themeOptions = [
    { theme: 'light', icon: faSun, label: 'Light' },
    { theme: 'dark', icon: faMoon, label: 'Dark' }
  ];

  return (
    <>
      <button
        className="color-picker-toggle"
        onClick={toggleTheme}
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        data-tooltip={theme === 'light' ? 'Dark mode' : 'Light mode'}
      >
        <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
      </button>

      <button
        className="color-picker-toggle"
        onClick={() => setIsOpen(true)}
        aria-label="Open appearance settings"
        data-tooltip="Appearance"
      >
        <FontAwesomeIcon icon={faPalette} />
      </button>

      {isOpen && (
        <div className="color-picker-overlay" role="dialog" aria-modal="true" aria-labelledby="color-picker-title">
          <div className="color-picker-modal" ref={modalRef}>
            <h2 id="color-picker-title" className="color-picker-title">Appearance Settings</h2>

            <div className="theme-section">
              <h3 className="section-subtitle">Theme</h3>
              <div className="theme-toggle-buttons">
                {themeOptions.map(({ theme: t, icon, label }) => (
                  <button
                    key={t}
                    className={`theme-option ${theme === t ? 'selected' : ''}`}
                    onClick={toggleTheme}
                    aria-label={`${label} theme`}
                    aria-pressed={theme === t}
                  >
                    <FontAwesomeIcon icon={icon} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="color-section">
              <h3 className="section-subtitle">Primary Color</h3>
              <div className="color-palette-grid">
                {colorPalettes.map((palette) => (
                  <button
                    key={palette.name}
                    className={`color-palette-option ${selectedColor === palette.name ? 'selected' : ''}`}
                    onClick={() => handleColorSelect(palette.name)}
                    onKeyDown={(e) => handleKeyDown(e, palette.name)}
                    aria-label={`${palette.name} color palette`}
                    aria-pressed={selectedColor === palette.name}
                  >
                    <div className="color-preview-container">
                      <div
                        className="color-preview"
                        style={{ backgroundColor: theme === 'light' ? palette.light.accent : palette.dark.accent }}
                      />
                      {selectedColor === palette.name && (
                        <div className="color-check">
                          <FontAwesomeIcon icon={faCheck} />
                        </div>
                      )}
                    </div>
                    <span className="color-name">{palette.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ColorPicker;
