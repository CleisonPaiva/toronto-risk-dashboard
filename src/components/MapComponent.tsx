import { useEffect, useRef } from 'react'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import '@arcgis/core/assets/esri/themes/dark/main.css'
import { createNeighborhoodsLayer } from '../layers/neighborhoodsLayer'
import { createHospitalsLayer } from '../layers/hospitalsLayer'
import { createSchoolsLayer } from '../layers/schoolsLayer'
import { createSubwaysLayer } from '../layers/subwaysLayer'
import { createFloodZonesLayer } from '../layers/floodZonesLayer'

export function MapComponent() {
    const mapRef = useRef<HTMLDivElement>(null)   // ← fora do useEffect
    const viewRef = useRef<MapView | null>(null)  // ← fora do useEffect

    useEffect(() => {
        if (viewRef.current) return  // já foi criado, ignora

        const map = new Map({ basemap: 'dark-gray-vector' })

        const view = new MapView({
            container: mapRef.current!,
            map,
            center: [-79.3528644, 43.718371],
            zoom: 10
        })

        viewRef.current = view  // ← salva a referência

        //Camadas
        map.add(createNeighborhoodsLayer())
        map.add(createHospitalsLayer())
        map.add(createSchoolsLayer())
        map.add(createSubwaysLayer())
        map.add(createFloodZonesLayer())

        return () => {
            view.destroy()
            viewRef.current = null
        }
    }, [])

    return <div ref={mapRef} style={{ height: '100vh', width: '100%' }} />
}
