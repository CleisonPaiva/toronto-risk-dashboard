import { useEffect, useRef } from 'react'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import LayerList from '@arcgis/core/widgets/LayerList'
import Legend from '@arcgis/core/widgets/Legend'
import Expand from '@arcgis/core/widgets/Expand'
import '@arcgis/core/assets/esri/themes/dark/main.css'
import { createNeighborhoodsLayer } from '../layers/neighborhoodsLayer'
import { createHospitalsLayer } from '../layers/hospitalsLayer'
import { createSchoolsLayer } from '../layers/schoolsLayer'
import { createSubwaysLayer } from '../layers/subwaysLayer'
import { createFloodZonesLayer } from '../layers/floodZonesLayer'
import Fullscreen from '@arcgis/core/widgets/Fullscreen'
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery'
import ScaleBar from '@arcgis/core/widgets/ScaleBar'
import Home from '@arcgis/core/widgets/Home'

interface Props { onViewReady: (view: MapView) => void }

export function MapComponent({ onViewReady }: Props) {

    const mapRef = useRef<HTMLDivElement>(null)

    // Evita que o mapa seja criado duas vezes no React StrictMode
    const viewRef = useRef<MapView | null>(null)

    useEffect(() => {
        if (viewRef.current) return

        const map = new Map({ basemap: 'dark-gray-vector' })

        const view = new MapView({
            container: mapRef.current!,
            map,
            center: [-79.3528644, 43.718371], // Toronto [lon, lat]
            zoom: 11
        })

        viewRef.current = view

        view.on('click', (event) => {
            view.hitTest(event).then((response) => {
                // só limpa se clicou no mapa vazio (sem features)
                if (response.results.length === 0) {
                    view.graphics.removeAll()
                }
            })
        })

        // Bairros — choropleth colorido por risk_count
        map.add(createNeighborhoodsLayer())

        // Infraestrutura crítica — verde (safe) ou vermelho (at risk)
        map.add(createHospitalsLayer())
        map.add(createSchoolsLayer())
        map.add(createSubwaysLayer())

        // Zonas de inundação do TRCA
        map.add(createFloodZonesLayer())

        // Fullscreen — botão para expandir o mapa para tela cheia
        const fullscreen = new Fullscreen({ view })
        view.ui.add(fullscreen, 'top-right')

        // BasemapGallery — permite trocar o basemap do mapa
        /*const basemapGallery = new BasemapGallery({ view })
        const expandBasemap = new Expand({ view, content: basemapGallery, expanded: false })
        view.ui.add(expandBasemap, 'top-right')*/

        // LayerList — controle de visibilidade das layers
        const layerList = new LayerList({ view })
        const expandLayerList = new Expand({ view, content: layerList, expanded: false })
        view.ui.add(expandLayerList, 'top-right')

        // Legend — explica as cores do choropleth e dos renderers
        const legend = new Legend({ view })
        const expandLegend = new Expand({ view, content: legend, expanded: false })
        view.ui.add(expandLegend, 'bottom-right')

        //Barra de escala
        const scaleBar = new ScaleBar({ view, unit: 'metric' })
        view.ui.add(scaleBar, 'bottom-left')

        //Botão para voltar ao extent inicial
        const home = new Home({ view })
        view.ui.add(home, 'top-left')

        onViewReady(view)

        return () => {
            view.destroy()
            viewRef.current = null
        }
    }, [])

    return <div ref={mapRef} style={{ height: '100vh', width: '100%' }} />
}
