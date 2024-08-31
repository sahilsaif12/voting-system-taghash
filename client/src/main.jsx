import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import "primereact/resources/themes/lara-dark-cyan/theme.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

    <App />
    </BrowserRouter>
  </StrictMode>,
)
