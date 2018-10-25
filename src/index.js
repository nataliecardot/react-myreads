import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  // Renders a Router component with history prop (a library also, like React Router, built by React Training)/object, which tracks URL changes and makes available throughout app (as long as BrowserRouter wraps the app)
  // Update: Using HashRouter to solve blank page issue after deployment, as suggested in https://docs.google.com/document/d/12yRK6HATIZ5cJETkj0e9S3fyLnHC-JBhTzZlQerNyIE/edit
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);
