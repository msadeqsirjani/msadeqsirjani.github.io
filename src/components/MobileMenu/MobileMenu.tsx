import {useEffect, useRef} from 'react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import type {Variants} from 'motion/react';
import Icon from '../Icon/Icon';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {useFocusTrap} from '../../hooks/useFocusTrap';
import {ALL_NAV_LINKS, normalizePath} from '../../constants/siteNav';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activePath: string;
  onNav: (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    anchor?: string,
  ) => void;
}

const MobileMenu = ({isOpen, onClose, activePath, onNav}: MobileMenuProps) => {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(panelRef, isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const panel: Variants = reduce
    ? {
        hidden: {opacity: 0},
        visible: {opacity: 1, transition: {duration: 0.15}},
        exit: {opacity: 0, transition: {duration: 0.15}},
      }
    : {
        hidden: {opacity: 0, scale: 1.04},
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.35,
            when: 'beforeChildren',
            staggerChildren: 0.045,
          },
        },
        exit: {
          opacity: 0,
          scale: 1.04,
          transition: {type: 'spring', bounce: 0, duration: 0.28},
        },
      };

  const item: Variants = reduce
    ? {hidden: {opacity: 0}, visible: {opacity: 1}, exit: {opacity: 0}}
    : {
        hidden: {opacity: 0, y: 16},
        visible: {
          opacity: 1,
          y: 0,
          transition: {type: 'spring', bounce: 0.2, duration: 0.4},
        },
        exit: {opacity: 0, y: 12, transition: {duration: 0.15}},
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="mobile-menu-overlay"
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          variants={panel}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <button
            type="button"
            className="nav-menu-close mobile-menu-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <Icon icon={faXmark} aria-hidden="true" />
          </button>
          <ul className="mobile-menu-list">
            {ALL_NAV_LINKS.map(link => (
              <motion.li key={link.id} variants={item}>
                <a
                  href={link.path + (link.anchor ? `#${link.anchor}` : '')}
                  className={`nav-link${
                    normalizePath(link.path) === activePath ? ' active' : ''
                  }`}
                  onClick={e => onNav(e, link.path, link.anchor)}
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
