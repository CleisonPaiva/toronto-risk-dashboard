import './App.css'
import { MapComponent } from './components/MapComponent'
import { RiskPanel } from './components/RiskPanel'

function App() {
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            {/* Mapa — 75% da largura */}
            <div style={{ width: '75%', height: '100vh' }}>
                <MapComponent />
            </div>

            {/* Painel lateral — 25% da largura */}
            <div style={{ width: '25%', height: '100vh' }}>
                <RiskPanel />
            </div>
        </div>
    )
}

export default App
