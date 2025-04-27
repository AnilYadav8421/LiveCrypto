import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Trending from './pages/Trending';
import Saved from './pages/Saved';
import Crypto from './pages/Crypto';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Crypto />} />
        <Route path="crypto" element={<Crypto />} />
        <Route path="trending" element={<Trending />} />
        <Route path="saved" element={<Saved />} />
      </Route>
    </Routes>
  );
};

export default App;
