import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Roadmap from './pages/Roadmap'
import Whitepaper from './pages/Whitepaper'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/whitepaper" element={<Whitepaper />} />
        <Route path="/white-paper" element={<Whitepaper />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
