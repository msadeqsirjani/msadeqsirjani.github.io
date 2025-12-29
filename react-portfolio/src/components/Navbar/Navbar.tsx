import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import ColorPicker from '../ColorPicker/ColorPicker';

interface NavbarProps {
  onSearchClick?: () => void;
}

const Navbar = ({ onSearchClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const dropdownMenuRef = useRef<HTMLUListElement | null>(null);

  useFocusTrap(dropdownMenuRef, isDropdownOpen);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';

    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      setIsDropdownOpen(false);
    }
  };

  const mainLinks = [
    { id: 'home', label: 'Home' },
    { id: 'biography', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'research', label: 'Research' },
    { id: 'publications', label: 'Publications' }
  ];

  const dropdownLinks = [
    { id: 'teaching', label: 'Teaching' },
    { id: 'news', label: 'News' },
    { id: 'awards', label: 'Awards' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <a href="#home" className="logo-text" onClick={(e) => scrollToSection(e, 'home')}>
            SS
          </a>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu" role="menubar">
          {mainLinks.map(link => (
            <li key={link.id} role="none">
              <a href={`#${link.id}`} className="nav-link" onClick={(e) => scrollToSection(e, link.id)}>
                {link.label}
              </a>
            </li>
          ))}
          <li className={`nav-dropdown ${isDropdownOpen ? 'open' : ''}`} role="none" ref={dropdownRef}>
            <button
              className="nav-dropdown-toggle"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              More
            </button>
            <ul className={`nav-dropdown-menu ${isDropdownOpen ? 'active' : ''}`} ref={dropdownMenuRef}>
              {dropdownLinks.map(link => (
                <li key={link.id} role="none">
                  <a href={`#${link.id}`} className="nav-link" onClick={(e) => scrollToSection(e, link.id)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          {dropdownLinks.map(link => (
            <li key={`mobile-${link.id}`} className="nav-mobile-item" role="none">
              <a href={`#${link.id}`} className="nav-link" onClick={(e) => scrollToSection(e, link.id)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-controls">
          <button
            className="search-toggle desktop-only"
            onClick={onSearchClick}
            aria-label="Open search"
            data-tooltip="Search (⌘K)"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>

          <ColorPicker currentTheme={theme} onThemeToggle={toggleTheme} />

          <button
            className="nav-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
