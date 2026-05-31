import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

console.log('[Diagnostic] VITE_EMAILJS_PUBLIC_KEY exists:', !!import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
console.log('[Diagnostic] VITE_EMAILJS_SERVICE_ID exists:', !!import.meta.env.VITE_EMAILJS_SERVICE_ID);
console.log('[Diagnostic] VITE_EMAILJS_OWNER_TEMPLATE_ID exists:', !!import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID);

const rootElement = document.getElementById('root')!;

if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>
  );
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>
  );
}

