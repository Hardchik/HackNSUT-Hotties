import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import AppliancesProvider from "./contexts/ApplianceProvider"

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AppliancesProvider>
    <App />
  </AppliancesProvider>
  // </React.StrictMode>,
)
