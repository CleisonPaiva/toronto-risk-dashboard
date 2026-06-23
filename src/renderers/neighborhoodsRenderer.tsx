import ClassBreaksRenderer from '@arcgis/core/renderers/ClassBreaksRenderer'
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol'

export const neighborhoodsRenderer = new ClassBreaksRenderer({
    field: 'riskCount',  // campo do properties que vai determinar a cor
    classBreakInfos: [
        {
            minValue: 0,
            maxValue: 0,
            symbol: new SimpleFillSymbol({
                color: [50, 80, 60, 0.6],   // verde escuro — sem risco
                outline: { color: [255, 255, 255, 0.3], width: 0.5 }
            }),
            label: 'No risk'
        },
        {
            minValue: 1,
            maxValue: 2,
            symbol: new SimpleFillSymbol({
                color: [217, 162, 59, 0.7],  // amarelo — risco médio
                outline: { color: [255, 255, 255, 0.3], width: 0.5 }
            }),
            label: 'Medium risk'
        },
        {
            minValue: 3,
            maxValue: 99,
            symbol: new SimpleFillSymbol({
                color: [217, 72, 59, 0.8],   // vermelho — alto risco
                outline: { color: [255, 255, 255, 0.3], width: 0.5 }
            }),
            label: 'High risk'
        }
    ]
})
