import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import NorthwindApp from './NorthwindApp.tsx'

createRoot(document.getElementById('northwind_root')!).render(
  <StrictMode>
        <NorthwindApp />
  </StrictMode>,
)
