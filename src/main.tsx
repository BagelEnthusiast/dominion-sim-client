import React from 'react'
import ReactDOM from 'react-dom/client'
import { DeckApp } from './DeckApp.tsx'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { OauthApp } from './OauthApp.jsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<DeckApp />} />
        <Route path="/oauth" element={<OauthApp />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
