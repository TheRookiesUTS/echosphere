import { Search } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '../../store/useStore'
import { toast } from '../../utils/toast'

const quickLocations = [
  { name: 'New York', lat: 40.7128, lng: -74.0060 },
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
]

export default function SearchLocation() {
  const [searchQuery, setSearchQuery] = useState('')
  const { setMapCenter, setMapZoom } = useStore()

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a location')
      return
    }

    // Try to parse coordinates
    const coordPattern = /^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/
    const match = searchQuery.match(coordPattern)

    if (match) {
      const lat = parseFloat(match[1])
      const lng = parseFloat(match[2])

      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        goToLocation(lat, lng, `Custom Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`)
        return
      }
    }

    // Use geocoding API
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      )
      const data = await response.json()

      if (data.length > 0) {
        const result = data[0]
        goToLocation(parseFloat(result.lat), parseFloat(result.lon), result.display_name)
      } else {
        toast.error('Location not found. Try coordinates (lat, lng) or a different search term.')
      }
    } catch (error) {
      console.error('Geocoding error:', error)
      toast.error('Error searching location. Please try again.')
    }
  }

  const goToLocation = (lat, lng, name) => {
    setMapCenter([lat, lng])
    setMapZoom(12)
    setSearchQuery('')
    toast.success(`Navigated to ${name}`)
  }

  return (
    <div>
      <h3 className="flex items-center gap-2 text-primary-400 font-semibold mb-4">
        <Search className="w-5 h-5" />
        Search Location
      </h3>
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter coordinates or place name"
            className="flex-1 p-3 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg text-white transition-all hover:shadow-lg hover:shadow-primary-500/30"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {quickLocations.map((location) => (
            <button
              key={location.name}
              onClick={() => goToLocation(location.lat, location.lng, location.name)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-xs transition-all hover:bg-white/20 hover:-translate-y-0.5"
            >
              {location.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

