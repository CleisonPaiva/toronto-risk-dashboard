import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer'
import { subwaysRenderer } from '../renderers/subwaysRenderer'

const API_URL = import.meta.env.VITE_API_URL

export function createSubwaysLayer(): GeoJSONLayer {

    return new GeoJSONLayer({
        url: `${API_URL}/api/subways`,
        title: 'Subways',
        renderer: subwaysRenderer,// Estilização do layer usando o renderer definido
        popupTemplate: {// Configuração do popup para exibir informações ao clicar
            title: '{name}',
            content: `
                                <b>Address:</b> {expression/addr}<br/>
                                <b>Network:</b> {expression/network}<br/>
                                <b>At flood risk:</b> {atRisk}
                            `,
            // Expressão Arcade que permite transformar valores dentro do template
            expressionInfos: [
                {
                    name: 'addr',
                    expression: 'IIF(IsEmpty($feature.addrStreet), "Not available", $feature.addrStreet)'
                },
                {
                    name: 'network',
                    expression: 'IIF(IsEmpty($feature.network), "Not available", $feature.network)'
                }
            ]
        }
    })
}
