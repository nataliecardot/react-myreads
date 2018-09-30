import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  // Renders a Router component with history prop (a library also, like React Router, built by React Training)/object, which tracks URL changes and makes available throughout app (as long as BrowserRouter wraps the app)
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
