// main.jsx - Entry point for React application

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initSentry } from './utils/sentry';

// Initialize Sentry for error tracking
initSentry();

// Create root and render App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

