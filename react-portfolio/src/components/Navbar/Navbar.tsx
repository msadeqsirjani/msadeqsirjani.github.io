import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  
  // Initialize theme safely for SSR
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Safe check for browser environment
    if (typeof window === 'undefined') return 'light';
    
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    
    // Check system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Close dropdown when clicking outside
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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
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

  const handleDropdownLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    scrollToSection(e, id);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <a href="#home" className="logo-text" onClick={(e) => scrollToSection(e, 'home')}>
            SS
          </a>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu" role="menubar">
          <li role="none">
            <a href="#home" className="nav-link" onClick={(e) => scrollToSection(e, 'home')}>Home</a>
          </li>
          <li role="none">
            <a href="#biography" className="nav-link" onClick={(e) => scrollToSection(e, 'biography')}>About</a>
          </li>
          <li role="none">
            <a href="#education" className="nav-link" onClick={(e) => scrollToSection(e, 'education')}>Education</a>
          </li>
          <li role="none">
            <a href="#research" className="nav-link" onClick={(e) => scrollToSection(e, 'research')}>Research</a>
          </li>
          <li role="none">
            <a href="#publications" className="nav-link" onClick={(e) => scrollToSection(e, 'publications')}>Publications</a>
          </li>
          <li className={`nav-dropdown ${isDropdownOpen ? 'open' : ''}`} role="none" ref={dropdownRef}>
            <button
              className="nav-dropdown-toggle"
              onClick={toggleDropdown}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              More
            </button>
            <ul className={`nav-dropdown-menu ${isDropdownOpen ? 'active' : ''}`} ref={dropdownMenuRef}>
              <li role="none">
                <a href="#teaching" className="nav-link" onClick={(e) => handleDropdownLinkClick(e, 'teaching')}>Teaching</a>
              </li>
              <li role="none">
                <a href="#news" className="nav-link" onClick={(e) => handleDropdownLinkClick(e, 'news')}>News</a>
              </li>
              <li role="none">
                <a href="#awards" className="nav-link" onClick={(e) => handleDropdownLinkClick(e, 'awards')}>Awards</a>
              </li>
              <li role="none">
                <a href="#contact" className="nav-link" onClick={(e) => handleDropdownLinkClick(e, 'contact')}>Contact</a>
              </li>
            </ul>
          </li>
          <li className="nav-mobile-item" role="none">
            <a href="#teaching" className="nav-link" onClick={(e) => scrollToSection(e, 'teaching')}>Teaching</a>
          </li>
          <li className="nav-mobile-item" role="none">
            <a href="#news" className="nav-link" onClick={(e) => scrollToSection(e, 'news')}>News</a>
          </li>
          <li className="nav-mobile-item" role="none">
            <a href="#awards" className="nav-link" onClick={(e) => scrollToSection(e, 'awards')}>Awards</a>
          </li>
          <li className="nav-mobile-item" role="none">
            <a href="#contact" className="nav-link" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
          </li>
        </ul>
        <div className="nav-controls">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            data-tooltip={theme === 'light' ? 'Dark mode' : 'Light mode'}
          >
            <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
          </button>
          <button
            className="nav-toggle"
            onClick={toggleMenu}
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
v>
  );
};

export default Navbar;
     </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
