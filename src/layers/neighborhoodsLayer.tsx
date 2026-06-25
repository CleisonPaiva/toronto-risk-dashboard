import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer'
import { neighborhoodsRenderer } from '../renderers/neighborhoodsRenderer'

const API_URL = import.meta.env.VITE_API_URL

export function createNeighborhoodsLayer(): GeoJSONLayer {
    
    return new GeoJSONLayer({
        url: `${API_URL}/api/neighborhoods`,
         title: 'Neighbourhoods',
        renderer: neighborhoodsRenderer,// Estilização do layer usando o renderer definido
        popupTemplate: {// Configuração do popup para exibir informações ao clicar
            title: '{name}',
            content: '⚠️ {riskCount} asset(s) in flood zones'
        }
    })
}
