import { MapContainer as LeafletMap, TileLayer, useMap } from 'react-leaflet'
import { useStore } from '../../store/useStore'
import { useEffect, memo } from 'react'
import StatusPanel from './StatusPanel'
import 'leaflet/dist/leaflet.css'

// Component to update map view when center/zoom changes
const MapController = memo(function MapController() {
  const map = useMap()
  // Selective subscription - only subscribe to what we need
  const mapCenter = useStore((state) => state.mapCenter)
  const mapZoom = useStore((state) => state.mapZoom)

  useEffect(() => {
    if (mapCenter && mapZoom) {
      map.setView(mapCenter, mapZoom)
    }
  }, [mapCenter, mapZoom, map])

  return null
})

// Base layer URLs
const baseLayers = {
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  topographic: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  terrain: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
  streets: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
}

// Memoize the entire map container
export default memo(function MapContainer() {
  // Selective subscriptions
  const mapCenter = useStore((state) => state.mapCenter)
  const mapZoom = useStore((state) => state.mapZoom)
  const baseLayer = useStore((state) => state.baseLayer)

  return (
    <section className="relative bg-white/10 rounded-2xl overflow-hidden border border-white/20">
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
})

