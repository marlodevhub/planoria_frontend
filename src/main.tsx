import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/globals.css'
import { Providers } from './app/providers/Providers'
import { AppRouter } from './app/router/Router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <AppRouter />
    </Providers>
  </React.StrictMode>
)