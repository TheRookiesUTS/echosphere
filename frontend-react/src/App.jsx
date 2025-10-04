import { useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MapContainer from './components/Map/MapContainer'
import DataPanel from './components/DataPanel'
import LoadingOverlay from './components/LoadingOverlay'
import { useStore } from './store/useStore'

function App() {
  const { loading, initializeData } = useStore()

  useEffect(() => {
    initializeData()
  }, [initializeData])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
      <Header />
      
      <main className="grid grid-cols-1 lg:grid-cols-[320px_1fr_350px] gap-4 p-4 h-[calc(100vh-80px)]">
        <Sidebar />
        <MapContainer />
        <DataPanel />
      </main>

      <LoadingOverlay isOpen={loading} />

      {/* NASA Attribution Footer */}
      <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 py-4 text-center text-sm text-gray-400">
        <div className="container mx-auto px-4">
          <p className="flex items-center justify-center gap-2">
            <span className="text-danger-600">🛰️</span>
            Data provided by NASA Earth Observation APIs | Urban Resilience Digital Twin for NASA Space Apps Challenge
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

