import { useStore } from '../../store/useStore'

export default function StatusPanel() {
  const { statusData } = useStore()

  return (
    <div className="absolute top-4 left-4 z-[1000] bg-black/80 backdrop-blur-md rounded-xl p-4 border border-white/20">
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between gap-8">
          <span className="text-gray-400">Heat Index:</span>
          <span className="text-primary-400 font-semibold">{statusData.heatIndex}</span>
        </div>
        <div className="flex items-center justify-between gap-8">
          <span className="text-gray-400">Air Quality:</span>
          <span className="text-primary-400 font-semibold">{statusData.airQuality}</span>
        </div>
        <div className="flex items-center justify-between gap-8">
          <span className="text-gray-400">Green Coverage:</span>
          <span className="text-primary-400 font-semibold">{statusData.greenCoverage}</span>
        </div>
      </div>
    </div>
  )
}

