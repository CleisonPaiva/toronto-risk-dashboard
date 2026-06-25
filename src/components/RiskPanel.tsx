import { useEffect, useState } from "react";
import "./RiskPanel.css";
import MapView from '@arcgis/core/views/MapView'
import Extent from '@arcgis/core/geometry/Extent'
import Graphic from '@arcgis/core/Graphic'
import Polygon from '@arcgis/core/geometry/Polygon'
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol'
import { ProgressSpinner } from 'primereact/progressspinner'
import 'primereact/resources/themes/lara-dark-cyan/theme.css'

const API_URL = import.meta.env.VITE_API_URL;

interface Props { view: MapView | null }

export function RiskPanel({ view }: Props) {

    const [atRisk, setAtRisk] = useState<any[]>([]);
    const [loading, setLoading] = useState(true)
    const [selectedId, setSelectedId] = useState<string | null>(null)

    useEffect(() => {
        fetch(`${API_URL}/api/neighborhoods/at-risk`)
            .then((response) => response.json())
            .then((data) => {
                setAtRisk(data.features)
                setLoading(false)
            });
    }, []);

    // Define a classe de cor (alto / médio / baixo) com base no riskCount
    const riskLevel = (n: number) => (n >= 4 ? "high" : n >= 2 ? "mid" : "low");

    // O bairro com mais risco representa 100% da barra; os outros são proporcionais
    const maxRisk = atRisk[0]?.properties.riskCount ?? 1;

    // Foca no bairro ao clicar na lista
    const handleClick = (feature: any) => {
        if (!view) return

        // Remove highlight anterior
        view.graphics.removeAll()

        // Se clicou no mesmo bairro, só limpa (toggle)
        if (selectedId === feature.properties.id) {
            setSelectedId(null)
            return
        }

        setSelectedId(feature.properties.id)

        // Cria e adiciona o highlight do bairro clicado
        const polygon = new Polygon({
            rings: feature.geometry.coordinates,
            spatialReference: { wkid: 4326 }
        })
        const symbol = new SimpleFillSymbol({
            color: [255, 255, 255, 0.1],
            outline: { color: [255, 255, 255, 0.9], width: 2 }
        })
        view.graphics.add(new Graphic({ geometry: polygon, symbol }))

        // Navega até o bairro usando o Extent (seu código que já funciona)
        const coords = feature.geometry.coordinates[0] as number[][]
        const lons = coords.map(c => c[0])
        const lats = coords.map(c => c[1])
        const extent = new Extent({
            xmin: Math.min(...lons),
            xmax: Math.max(...lons),
            ymin: Math.min(...lats),
            ymax: Math.max(...lats),
            spatialReference: { wkid: 4326 }
        })
        view.goTo(extent, { animate: true, duration: 800 })
    }

    if (loading) return (
        <div className="risk-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ProgressSpinner style={{ width: '40px', height: '40px' }} />
        </div>
    )

    return (
        <div className="risk-panel">
            {/* Cabeçalho */}
            <header className="rp-header">
                <div className="rp-eyebrow">
                    <span className="rp-dot" />
                    <span>Toronto Risk Dashboard</span>
                </div>
                <h1 className="rp-title">
                    Most at-risk<br />neighbourhoods
                </h1>
                <p className="rp-subtitle">
                    <b>{atRisk.length} neighbourhoods</b> have critical infrastructure inside a flood zone.
                </p>
            </header>

            {/* Rótulos das colunas */}
            <div className="rp-col-labels">
                <span>Neighbourhood</span>
                <span>Assets</span>
            </div>

            {/* Lista (scroll só aparece se a lista for maior que o espaço) */}
            <div className="rp-list">
                {atRisk.map((feature, index) => {
                    const { riskCount, name } = feature.properties;
                    const level = riskLevel(riskCount);
                    const width = Math.round((riskCount / maxRisk) * 100);

                    return (
                        <div key={feature.properties.id} className="rp-row" onClick={() => handleClick(feature)}>
                            <div className="rp-row-top">
                                <span className="rp-rank">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="rp-name">{name}</span>
                                <span className={`rp-count rp-${level}`}>{riskCount}</span>
                            </div>
                            <div className="rp-track">
                                <div
                                    className={`rp-fill rp-${level}-bg`}
                                    style={{ width: `${width}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Rodapé */}
            <footer className="rp-footer">
                <p>Sources · OpenStreetMap, City of Toronto Open Data, TRCA</p>
                <p>Created by: Cleison Paiva</p>
            </footer>
        </div>
    );
}
