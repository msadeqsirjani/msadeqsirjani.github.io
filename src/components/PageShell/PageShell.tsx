import type {ReactNode} from 'react';
import {ROUTE_PATHS} from '../../constants/siteNav';
import {navLinkProps} from '../../utils/router';
import './PageShell.css';

interface PageShellProps {
  children: ReactNode;
}

/** Wraps a standalone section page with a back-to-home link. */
const PageShell = ({children}: PageShellProps) => (
  <div className="page-shell">
    <div className="container">
      <a className="page-back-link" {...navLinkProps(ROUTE_PATHS.home)}>
        ← Back to home
      </a>
    </div>
    {children}
  </div>
);

export default PageShell;
