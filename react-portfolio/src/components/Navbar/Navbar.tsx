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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dropdownRef = useRef<HTMLLIElement>(null);
  const dropdownMenuRef = useRef<HTMLUListElement | null>(null);
  const dropdownToggleRef = useRef<HTMLButtonElement>(null);
  const dropdownItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

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

  const closeDropdown = () => setIsDropdownOpen(false);

  const focusItem = (index: number) => {
    dropdownItemRefs.current[index]?.focus();
  };

  const handleToggleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsDropdownOpen(true);
      setTimeout(() => focusItem(0), 0);
    } else if (e.key === 'Escape') {
      closeDropdown();
    }
  };

  const handleItemKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusItem((index + 1) % dropdownLinks.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (index === 0) {
        closeDropdown();
        dropdownToggleRef.current?.focus();
      } else {
        focusItem(index - 1);
      }
    } else if (e.key === 'Escape') {
      closeDropdown();
      dropdownToggleRef.current?.focus();
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navbar = document.querySelector('.navbar') as HTMLElement;
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const top = element.getBoundingClientRect().top + window.scrollY - navbarHeight - 24;
      window.scrollTo({ top, behavior: 'smooth' });
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
    <nav className={`navbar${isScrolled ? ' navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
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
              ref={dropdownToggleRef}
              onClick={(e) => {
                e.stopPropagation();
                if (isDropdownOpen) closeDropdown();
                else setIsDropdownOpen(true);
              }}
              onKeyDown={handleToggleKeyDown}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              More
            </button>
            <ul className={`nav-dropdown-menu ${isDropdownOpen ? 'active' : ''}`} ref={dropdownMenuRef}>
              {dropdownLinks.map((link, index) => (
                <li key={link.id} role="none">
                  <a
                    href={`#${link.id}`}
                    className="nav-link"
                    ref={el => { dropdownItemRefs.current[index] = el; }}
                    onClick={(e) => scrollToSection(e, link.id)}
                    onKeyDown={(e) => handleItemKeyDown(e, index)}
                  >
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
