import { useState } from 'react'
import './App.css'
import { MapComponent } from './components/MapComponent'
import { RiskPanel } from './components/RiskPanel'
import MapView from '@arcgis/core/views/MapView'

function App() {

    const [view, setView] = useState<MapView | null>(null)

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            {/* Mapa — 75% da largura */}
            <div style={{ width: '75%', height: '100vh' }}>
                <MapComponent onViewReady={setView}/>
            </div>

            {/* Painel lateral — 25% da largura */}
            <div style={{ width: '25%', height: '100vh' }}>
                <RiskPanel view={view}/>
            </div>
        </div>
    )
}

export default App
