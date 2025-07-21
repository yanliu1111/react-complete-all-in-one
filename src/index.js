import './index.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { StoreProvider } from 'easy-peasy';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Router>
          <Routes>
              <Route path="/*" element={<App/>} />
          </Routes>
      </Router>
    </StoreProvider>
  </React.StrictMode>,
);