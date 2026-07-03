import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import '../../design-system-tokens.css';
import './styles.css';

document.documentElement.setAttribute('data-theme', 'light');
createRoot(document.getElementById('root')).render(<App />);
