import { useEffect, useState } from "react";
import "./RiskPanel.css";

const API_URL = import.meta.env.VITE_API_URL;

export function RiskPanel() {
    const [atRisk, setAtRisk] = useState<any[]>([]);

    useEffect(() => {
        fetch(`${API_URL}/api/neighborhoods/at-risk`)
            .then((response) => response.json())
            .then((data) => setAtRisk(data.features));
    }, []);

    // Define a classe de cor (alto / médio / baixo) com base no riskCount
    const riskLevel = (n: number) => (n >= 4 ? "high" : n >= 2 ? "mid" : "low");

    // O bairro com mais risco representa 100% da barra; os outros são proporcionais
    const maxRisk = atRisk[0]?.properties.riskCount ?? 1;

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
                        <div key={feature.properties.id} className="rp-row">
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
            </footer>
        </div>
    );
}
