import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer'
import { schoolsRenderer } from '../renderers/schoolsRenderer'

const API_URL = import.meta.env.VITE_API_URL

export function createSchoolsLayer(): GeoJSONLayer {
    return new GeoJSONLayer({
        url: `${API_URL}/api/schools`,
        title: 'Schools',
        renderer: schoolsRenderer,// Estilização do layer usando o renderer definido
        popupTemplate: {// Configuração do popup para exibir informações ao clicar
            title: '{name}',
            content: `
                        <b>Address:</b> {expression/addr}<br/>
                        <b>Website:</b> {expression/website}<br/>
                        <b>At flood risk:</b> {atRisk}
                    `,
            // Expressão Arcade que permite transformar valores dentro do template
            expressionInfos: [
                {
                    name: 'addr',
                    expression: 'IIF(IsEmpty($feature.addrStreet), "Not available", $feature.addrStreet)'
                },
                {
                    name: 'website',
                    expression: 'IIF(IsEmpty($feature.website), "Not available", $feature.website)'
                }
            ]
        }
    })
}
