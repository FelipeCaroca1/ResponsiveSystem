import React from 'react'
import ReactDOM from 'react-dom/client'
import { ResponsiveLayoutProvider } from 'responsive-system'
import DefaultLayout from './layouts/DefaultLayout'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ResponsiveLayoutProvider defaultLayout="default">
      <DefaultLayout>
        <App />
      </DefaultLayout>
    </ResponsiveLayoutProvider>
  </React.StrictMode>,
)
