import { useState } from 'react'
import HomePage from './components/HomePage'
import FormView from './components/FormView'
import AlertView from './components/AlertView'
import ResultsView from './components/ResultsView'
import LeadModal from './components/LeadModal'
import { calculateRacePlan } from './utils/calculations'

export default function App() {
  const [currentView, setCurrentView] = useState('home')
  const [formData, setFormData] = useState({
    fcmax: '',
    vma: '',
    distance: '10km',
    profil: 'intermediaire'
  })
  const [racePlan, setRacePlan] = useState(null)
  const [pendingData, setPendingData] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleFormSubmit = (data) => {
    setFormData(data)
    setPendingData(data)
    setShowModal(true)
  }

  const handleLeadSubmit = () => {
    setShowModal(false)
    const data = pendingData
    const hasMissingData =
      !data.fcmax || !data.vma ||
      Number(data.fcmax) === 0 || Number(data.vma) === 0
    if (hasMissingData) {
      setCurrentView('alert')
    } else {
      const plan = calculateRacePlan({
        fcmax: Number(data.fcmax),
        vma: Number(data.vma),
        distance: data.distance,
        profil: data.profil
      })
      setRacePlan(plan)
      setCurrentView('results')
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      {currentView === 'home' && (
        <HomePage onStart={() => setCurrentView('form')} />
      )}
      {currentView === 'form' && (
        <FormView
          initialData={formData}
          onSubmit={handleFormSubmit}
          onBack={() => setCurrentView('home')}
        />
      )}
      {currentView === 'alert' && (
        <AlertView
          onBack={() => setCurrentView('form')}
          formData={formData}
        />
      )}
      {currentView === 'results' && racePlan && (
        <ResultsView
          plan={racePlan}
          onRecalculate={() => setCurrentView('form')}
        />
      )}

      {showModal && <LeadModal onSubmit={handleLeadSubmit} />}
    </div>
  )
}
