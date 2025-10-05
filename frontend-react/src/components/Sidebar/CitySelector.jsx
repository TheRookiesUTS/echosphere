import { MapPin } from 'lucide-react'
import { useStore } from '../../store/useStore'

export default function CitySelector() {
  const { currentCity, setCurrentCity, getCities } = useStore()
  const cities = getCities()

  return (
    <div>
      <h3 className="flex items-center gap-2 text-primary-400 font-semibold mb-4">
        <MapPin className="w-5 h-5" />
        Select City
      </h3>
      <select
        value={currentCity}
        onChange={(e) => setCurrentCity(e.target.value)}
        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent cursor-pointer"
      >
        {Object.entries(cities).map(([key, city]) => (
          <option key={key} value={key} className="bg-primary-800 text-white">
            {city.name}
          </option>
        ))}
      </select>
    </div>
  )
}

