import { MapContainer as LeafletMap, TileLayer, useMap } from 'react-leaflet'
import { useStore } from '../../store/useStore'
import { useEffect } from 'react'
import StatusPanel from './StatusPanel'
import 'leaflet/dist/leaflet.css'

// Component to update map view when center/zoom changes
function MapController() {
  const map = useMap()
  const { mapCenter, mapZoom } = useStore()

  useEffect(() => {
    if (mapCenter && mapZoom) {
      map.setView(mapCenter, mapZoom)
    }
  }, [mapCenter, mapZoom, map])

  return null
}

// Base layer URLs
const baseLayers = {
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  topographic: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  terrain: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
  streets: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
}

export default function MapContainer() {
  const { mapCenter, mapZoom, baseLayer } = useStore()

  return (
    <section className="relative bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20">
      <LeafletMap
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        attributionControl={true}
      >
        <TileLayer
          url={baseLayers[baseLayer] || baseLayers.satellite}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapController />
      </LeafletMap>
      
      <StatusPanel />
    </section>
  )
}

