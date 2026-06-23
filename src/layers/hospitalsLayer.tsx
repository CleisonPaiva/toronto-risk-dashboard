import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer'
import { hospitalsRenderer } from '../renderers/hospitalsRenderer'

const API_URL = import.meta.env.VITE_API_URL

export function createHospitalsLayer(): GeoJSONLayer {
    return new GeoJSONLayer({
        url: `${API_URL}/api/hospitals`,
         title: 'Hospitals',
        renderer: hospitalsRenderer,// Estilização do layer usando o renderer definido
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
            /*expressionInfos: [{
                name: 'atRisk',
                expression: 'IIF($feature.atRisk == 1, "⚠️ Yes", "✅ No")'
            }]*/
        }

        //Usando o formato de array de fieldInfos (mais estruturado, estilo tabela automática)
        /*popupTemplate: {
            title: '{name}',
            content: [{
                type: 'fields',
                fieldInfos: [
                    { fieldName: 'addrStreet', label: 'Address' },
                    { fieldName: 'atRisk', label: 'At flood risk' }
                ]
            }]
        }*/

    })
}
