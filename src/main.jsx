import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CryptoProvider } from './context/CryptoContext.jsx'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <BrowserRouter>
        <CryptoProvider>
          <App />
        </CryptoProvider>
    </BrowserRouter>
  </React.StrictMode>
)
