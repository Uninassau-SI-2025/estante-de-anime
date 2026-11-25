import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { EstanteProvider } from './context/EstanteContext'
import './styles/base.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <EstanteProvider>
        <App />
      </EstanteProvider>
    </BrowserRouter>
  </React.StrictMode>
)
