import React from 'react'
import ReactDOM from 'react-dom/client'
import { DeckApp } from './DeckApp.tsx'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { LoginForm } from './components/LoginForm.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<DeckApp />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
