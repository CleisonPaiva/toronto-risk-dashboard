# Toronto Infrastructure Risk Dashboard — Frontend

An interactive geospatial dashboard built with React and the ArcGIS Maps SDK for JavaScript that visualizes flood-risk assessments for critical infrastructure across Toronto neighbourhoods.

This is the frontend layer of a larger project: the **Toronto Infrastructure Risk Dashboard**, which combines a [Python ETL pipeline](https://github.com/CleisonPaiva/toronto-risk-etl), an [ASP.NET Core API](https://github.com/CleisonPaiva/toronto-risk-api), and this React frontend to answer a real question: which hospitals, schools, and subway stations in Toronto fall within flood-risk zones?

**Live demo:** [toronto-risk-dash.vercel.app](https://toronto-risk-dash.vercel.app)

---

## What it shows

- **Neighbourhood choropleth** — all 140 Toronto neighbourhoods coloured by `risk_count` (green → yellow → red)
- **Hospital layer** — green markers for safe hospitals, red for those inside flood zones
- **School layer** — purple markers for safe schools, red for at-risk
- **Subway stations** — cyan markers for safe stations, red for at-risk
- **Flood zones** — TRCA flood-risk polygons from City of Toronto open data
- **Risk ranking panel** — sidebar listing the 21 at-risk neighbourhoods ordered by severity, with proportional progress bars
- **Click-to-navigate** — clicking a neighbourhood in the panel highlights it on the map and flies the camera to it

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **ArcGIS Maps SDK for JavaScript** (`@arcgis/core`) — map rendering, layers, renderers, widgets
- **Tailwind CSS** — layout
- **PrimeReact** — loading spinner
- **CSS Modules** — scoped panel styles

## ArcGIS SDK features used

- `GeoJSONLayer` — loads data directly from the API endpoints
- `ClassBreaksRenderer` — choropleth colouring for neighbourhoods by `risk_count`
- `UniqueValueRenderer` — colour-coding infrastructure by `atRisk` field ("Yes"/"No")
- `SimpleFillSymbol` / `SimpleMarkerSymbol` — custom symbols per layer
- `PopupTemplate` — click popups for each layer
- `LayerList` + `Legend` + `BasemapGallery` + `ScaleBar` + `Home` — native widgets via `Expand`
- `view.goTo()` + `Extent` — programmatic navigation from the panel
- `view.graphics` — temporary highlight polygon on neighbourhood click
- `view.hitTest()` — clear highlight when clicking empty map area

## Project Structure

```
src/
├── components/
│   ├── MapComponent.tsx     # ArcGIS map, view, layers, widgets
│   ├── RiskPanel.tsx        # Sidebar with neighbourhood ranking
│   └── RiskPanel.css        # Scoped panel styles
├── layers/
│   ├── neighborhoodsLayer.ts
│   ├── hospitalsLayer.ts
│   ├── schoolsLayer.ts
│   ├── subwaysLayer.ts
│   └── floodZonesLayer.ts
├── renderers/
│   ├── neighborhoodsRenderer.ts   # ClassBreaksRenderer
│   ├── hospitalsRenderer.ts       # UniqueValueRenderer
│   ├── schoolsRenderer.ts
│   └── subwaysRenderer.ts
└── App.tsx
```

## Running locally

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
cp .env.example .env
# Fill in VITE_API_URL and VITE_ESRI_API_KEY

# 3. Start dev server
npm run dev
```

### Environment variables

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the ASP.NET Core API (e.g. `http://localhost:5048`) |
| `VITE_ESRI_API_KEY` | ArcGIS developer API key from [developers.arcgis.com](https://developers.arcgis.com) |

The API key is required to load Esri basemaps. You can create a free key at [developers.arcgis.com/dashboard](https://developers.arcgis.com/dashboard). For production, configure the allowed referrers on the key to restrict usage to your domain.

## Data flow

```
City of Toronto / OpenStreetMap
        ↓
  Python ETL (GeoPandas, OSMnx)
        ↓
  Supabase / PostGIS
        ↓
  ASP.NET Core API → GeoJSON endpoints
        ↓
  GeoJSONLayer (ArcGIS SDK)
        ↓
  React Dashboard
```

## Related repositories

| Repository | Description |
|---|---|
| [toronto-risk-etl](https://github.com/CleisonPaiva/toronto-risk-etl) | Python ETL pipeline — data extraction, spatial risk calculation, PostGIS load |
| [toronto-risk-api](https://github.com/CleisonPaiva/toronto-risk-api) | ASP.NET Core REST API — GeoJSON endpoints for all layers |
| [toronto-risk-dashboard](https://github.com/CleisonPaiva/toronto-risk-dashboard) | This repository — React frontend |
