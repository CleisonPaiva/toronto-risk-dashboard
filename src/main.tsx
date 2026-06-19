import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import esriConfig from '@arcgis/core/config'

esriConfig.apiKey = import.meta.env.VITE_ESRI_API_KEY

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
