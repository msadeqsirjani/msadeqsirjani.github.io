import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import '@fontsource/roboto/latin-400.css';
import '@fontsource/roboto/latin-500.css';
import '@fontsource/roboto/latin-700.css';
import '@fontsource/cinzel/latin-600.css';
import './index.css';
import App from './App.tsx';
import {registerServiceWorker} from './registerSW';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

registerServiceWorker();
