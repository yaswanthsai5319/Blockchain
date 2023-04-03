import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import App from './App';

function App1() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/*" element={<Outlet />} /> */}
        <Route path="/main" element={<App />} />
      </Routes>
    </Router>
  );
}

export default App1;
