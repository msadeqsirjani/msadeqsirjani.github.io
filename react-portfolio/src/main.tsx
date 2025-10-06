import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { registerServiceWorker } from './registerSW'
import { initAnalytics } from './utils/analytics'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register service worker for PWA support
registerServiceWorker()

// Initialize analytics
initAnalytics()
