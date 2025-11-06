import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AdminDashboard from './components/Admin/AdminDashboard';
import { Toaster } from 'sonner';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AdminDashboard />
      <Toaster
        position="bottom-left"
        closeButton
        expand={false}
      />
    </ErrorBoundary>
  </StrictMode>,
);
