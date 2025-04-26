import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Trending from './pages/Trending'
import Saved from './pages/Saved'
import Crypto from './pages/Crypto'

const App = () => {
  const location = useLocation();

  return (
    <div>
      <Home />

      <Routes location={location}>
        <Route path="/" element={<Crypto />} />
        {/* <Route path="/crypto" element={<Crypto />} /> */}
        <Route path="/trending" element={<Trending />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </div>

  )
}

export default App