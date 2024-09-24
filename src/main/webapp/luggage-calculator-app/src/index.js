// src/index.js
import React from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App'; // Import your App component
import './index.css'; // Import any global styles if you have them

ReactDOM.render(
  <BrowserRouter basename="/payara">
    <App />
  </BrowserRouter>,
  document.getElementById('root') // Ensure this matches your public/index.html
);
