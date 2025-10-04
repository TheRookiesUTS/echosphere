import DataLayers from './DataLayers'
import PlanningScenarios from './PlanningScenarios'
import CitySelector from './CitySelector'
import SearchLocation from './SearchLocation'
import MapLayers from './MapLayers'
import AreaSelection from './AreaSelection'
import ElevationPanel from './ElevationPanel'

export default function Sidebar() {
  return (
    <aside className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 overflow-y-auto scrollbar-thin">
      <div className="space-y-6">
        <DataLayers />
        <PlanningScenarios />
        <CitySelector />
        <SearchLocation />
        <MapLayers />
        <AreaSelection />
        <ElevationPanel />
      </div>
    </aside>
  )
}

