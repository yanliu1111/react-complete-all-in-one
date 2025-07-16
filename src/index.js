import './index.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <Routes>
            <Route path="/*" element={<App/>} />
        </Routes>
    </Router>
  </React.StrictMode>,
);