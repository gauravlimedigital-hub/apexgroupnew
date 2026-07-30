import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LeadModalProvider } from './contexts/LeadModalContext';

// Import CSS
import './styles/blog-listing.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <LeadModalProvider>
        <App />
      </LeadModalProvider>
    </React.StrictMode>
  );
}
