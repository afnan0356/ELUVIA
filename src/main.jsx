import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'

// GitHub Pages SPA redirect restore
const redirect = sessionStorage.getItem('spa_redirect')
if (redirect) {
  sessionStorage.removeItem('spa_redirect')
  window.history.replaceState(null, '', '/eluvia' + redirect)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/eluvia">
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
