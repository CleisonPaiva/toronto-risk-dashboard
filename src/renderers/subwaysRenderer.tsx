import UniqueValueRenderer from '@arcgis/core/renderers/UniqueValueRenderer'
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol'

export const subwaysRenderer = new UniqueValueRenderer({
    field: 'atRisk',
    uniqueValueInfos: [
        {
            value: 'No',
            symbol: new SimpleMarkerSymbol({
                color: [0, 200, 210, 0.9],  // ciano
                size: 7,
                outline: { color: [255, 255, 255, 0.5], width: 0.5 }
            }),
            label: 'Safe'
        },
        {
            value: 'Yes',
            symbol: new SimpleMarkerSymbol({
                color: [217, 72, 59, 0.9],   // vermelho
                size: 10,
                outline: { color: [255, 255, 255, 0.8], width: 1 }
            }),
            label: 'At risk'
        }
    ]
})
