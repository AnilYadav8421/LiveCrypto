import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Trending from './pages/Trending';
import Saved from './pages/Saved';
import Crypto from './pages/Crypto';
import CryptoPage from './components/CryptoDetails';
import Registration from './pages/Registration';
import Login from './pages/Login';

const App = () => {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Login Page */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />

      <Route path="/home" element={<Home />} >
        <Route index element={<Crypto />} />
        <Route path="crypto" element={<Crypto />} />
        <Route path='crypto/:coinId' element={<CryptoPage />} />
        <Route path="trending" element={<Trending />} />
        <Route path="saved" element={<Saved />} />
      </Route>
    </Routes>
  );
};

export default App;
