import React from 'react'
import { createRoot } from 'react-dom/client'
import './output.css'
import { App } from './App/App'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
