import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { SweetMomentsApp } from './SweetMomentsApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SweetMomentsApp></SweetMomentsApp>
  </StrictMode>,
)
