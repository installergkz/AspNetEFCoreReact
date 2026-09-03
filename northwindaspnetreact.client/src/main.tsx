import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
//import App from './App.tsx'
import NorthwindApp from './NorthwindApp'

// createRoot(document.getElementById('weatherForecast_root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

createRoot(document.getElementById('northwind_root')!).render(
  <StrictMode>
        <NorthwindApp />
  </StrictMode>,
)
