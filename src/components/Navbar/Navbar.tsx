import {useState, useEffect, useRef} from 'react';
import Icon from '../Icon/Icon';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {useFocusTrap} from '../../hooks/useFocusTrap';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import {
  DROPDOWN_NAV_LINKS,
  MAIN_NAV_LINKS,
  ROUTE_PATHS,
} from '../../constants/siteNav';
import {navigate} from '../../utils/router';

interface NavbarProps {
  onSearchClick?: () => void;
}

const Navbar = ({onSearchClick}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dropdownRef = useRef<HTMLLIElement>(null);
  const dropdownMenuRef = useRef<HTMLUListElement | null>(null);
  const dropdownToggleRef = useRef<HTMLButtonElement>(null);
  const dropdownItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useFocusTrap(dropdownMenuRef, isDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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

  const handleItemKeyDown = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    index: number,
  ) => {
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

  const hrefFor = (path: string, anchor?: string) =>
    path + (anchor ? `#${anchor}` : '');

  const handleNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    anchor?: string,
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) {
      return;
    }
    e.preventDefault();
    navigate(path, anchor);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const mainLinks = MAIN_NAV_LINKS;
  const dropdownLinks = DROPDOWN_NAV_LINKS;

  return (
    <nav
      className={`navbar${isScrolled ? ' navbar--scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-container">
        <div className="nav-logo">
          <a
            href={ROUTE_PATHS.home}
            className="logo-text"
            onClick={e => handleNav(e, ROUTE_PATHS.home)}
            aria-label="SS — Mohammad Sadegh Sirjani, Home"
          >
            SS
          </a>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu">
          {mainLinks.map(link => (
            <li key={link.id}>
              <a
                href={hrefFor(link.path, link.anchor)}
                className="nav-link"
                onClick={e => handleNav(e, link.path, link.anchor)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li
            className={`nav-dropdown ${isDropdownOpen ? 'open' : ''}`}
            ref={dropdownRef}
          >
            <button
              type="button"
              className="nav-dropdown-toggle"
              ref={dropdownToggleRef}
              onClick={e => {
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
            <ul
              className={`nav-dropdown-menu ${isDropdownOpen ? 'active' : ''}`}
              ref={dropdownMenuRef}
            >
              {dropdownLinks.map((link, index) => (
                <li key={link.id}>
                  <a
                    href={hrefFor(link.path, link.anchor)}
                    className="nav-link"
                    ref={el => {
                      dropdownItemRefs.current[index] = el;
                    }}
                    onClick={e => handleNav(e, link.path, link.anchor)}
                    onKeyDown={e => handleItemKeyDown(e, index)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          {dropdownLinks.map(link => (
            <li key={`mobile-${link.id}`} className="nav-mobile-item">
              <a
                href={hrefFor(link.path, link.anchor)}
                className="nav-link"
                onClick={e => handleNav(e, link.path, link.anchor)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-controls">
          <button
            type="button"
            className="search-toggle desktop-only"
            onClick={onSearchClick}
            aria-label="Open search"
            data-tooltip="Search (⌘K)"
          >
            <Icon icon={faSearch} />
          </button>

          <ThemeToggle />

          <button
            type="button"
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
