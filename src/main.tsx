import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import esriConfig from '@arcgis/core/config'

esriConfig.apiKey = 'AAPTa1pShzgv4AmkI8AZMsCmBUQ..pu7GQEiV-yWomcZQ4YlSBIIN-9GvlK0Lgc0EVqPcuSNC5xHcD8v0-IELVbfljW1Wt5CAdrCfFMP4-vx27Wo-4tv_kALbng9J_CMrYEPKqwCTQhqT0RDdIqq3vjlu6XSuUCnVT6R0a07iNJEWtwyo-wOiY0cFHzwrWyA2cf8iQbVgf2TtmOZKjOPxEy0ChwM1Iq77GqDLg43dYTnTFf6-xmmZxMCoWQ8CeYN_qSRwrbFcKJ3zNE80sA..AT1_83Q1q6hR'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
