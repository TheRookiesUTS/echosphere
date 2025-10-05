import { TrendingUp, Layers } from 'lucide-react'
import { useStore } from '../../store/useStore'

export default function ElevationPanel() {
  const { elevationProfile, showContours, toggleContours } = useStore()

  return (
    <div>
      <h3 className="flex items-center gap-2 text-primary-400 font-semibold mb-4">
        <TrendingUp className="w-5 h-5" />
        Elevation Profile
      </h3>
      <div className="space-y-3">
        <div className="space-y-2">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg font-semibold text-white text-sm transition-all hover:shadow-lg hover:shadow-purple-500/30">
            <TrendingUp className="w-4 h-4" />
            Show Elevation
          </button>
          <button
            onClick={toggleContours}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-white text-sm transition-all ${
              showContours
                ? 'bg-gradient-to-r from-purple-600 to-purple-500 shadow-lg shadow-purple-500/30'
                : 'bg-white/10 border border-white/20 hover:bg-white/20'
            }`}
          >
            <Layers className="w-4 h-4" />
            Contour Lines
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-gray-400">
          {elevationProfile ? (
            <div>
              <h4 className="text-primary-400 font-semibold mb-2">Elevation Analysis</h4>
              <p>Data visualization coming soon...</p>
            </div>
          ) : (
            <p className="text-center">Click "Show Elevation" to analyze terrain</p>
          )}
        </div>
      </div>
    </div>
  )
}

