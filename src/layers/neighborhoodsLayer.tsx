import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer'

const API_URL = import.meta.env.VITE_API_URL

export function createNeighborhoodsLayer(): GeoJSONLayer {
    return new GeoJSONLayer({
        url: `${API_URL}/api/neighborhoods`
    })
}
