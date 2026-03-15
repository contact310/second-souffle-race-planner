import { useState } from 'react'
import Logo from './Logo'

const DISTANCE_OPTIONS = [
  { value: '10km', label: '10 kilomètres' },
  { value: 'semi', label: 'Semi-marathon (21,1 km)' },
  { value: 'marathon', label: 'Marathon (42,2 km)' }
]

const PROFIL_OPTIONS = [
  { value: 'debutant', label: "Débutant — moins d'1 an de pratique régulière" },
  { value: 'intermediaire', label: 'Intermédiaire — 1 à 3 ans, quelques courses terminées' },
  { value: 'confirme', label: 'Confirmé — 3 ans+, stratégie de course maîtrisée' },
  { value: 'competiteur', label: 'Compétiteur — objectif chrono précis et ambitieux' }
]

export default function FormView({ initialData, onSubmit, onBack }) {
  const [data, setData] = useState(initialData)
  const [unknownFcmax, setUnknownFcmax] = useState(false)
  const [unknownVma, setUnknownVma] = useState(false)
  const [showFcmaxTip, setShowFcmaxTip] = useState(false)
  const [showVmaTip, setShowVmaTip] = useState(false)

  const handleUnknownFcmax = () => {
    setUnknownFcmax(true)
    setData(prev => ({ ...prev, fcmax: '' }))
  }

  const handleUnknownVma = () => {
    setUnknownVma(true)
    setData(prev => ({ ...prev, vma: '' }))
  }

  const handleFcmaxChange = (e) => {
    setUnknownFcmax(false)
    setData(prev => ({ ...prev, fcmax: e.target.value }))
  }

  const handleVmaChange = (e) => {
    setUnknownVma(false)
    setData(prev => ({ ...prev, vma: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(data)
  }

  const inputBase = "w-full bg-[#1A1A1A] text-white rounded-lg px-4 py-3 border outline-none transition-all duration-200"
  const inputNormal = `${inputBase} border-[#2A2A2A] focus:border-[#6A00FF]`
  const inputWarning = `${inputBase} border-[#F4804A]`

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-lg mx-auto">
        <button
          onClick={onBack}
          className="text-[#A0A0A0] hover:text-white mb-6 text-sm transition-colors duration-200"
        >
          ← Retour
        </button>
        <div className="mb-8">
          <Logo className="mb-4" />
          <h2 className="text-2xl font-bold text-white mt-2">Tes données physiologiques</h2>
          <p className="text-[#A0A0A0] mt-1 text-sm">Remplis les champs pour obtenir ton plan personnalisé.</p>
          <p className="text-[#E63946] mt-2 text-sm font-semibold">
            Si tu ne connais pas une valeur, clique sur{' '}
            <span className="text-[#F4804A] font-bold">"Je ne connais pas"</span>{' '}
            en orange sous le champ correspondant.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* FCmax */}
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">
              Ta fréquence cardiaque maximale (FCmax)
            </label>
            <p className="text-[#A0A0A0] text-xs mb-2">La FC la plus haute jamais atteinte à l'effort.</p>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="Ex : 185"
                min={120}
                max={220}
                value={data.fcmax}
                onChange={handleFcmaxChange}
                className={unknownFcmax ? inputWarning : inputNormal}
              />
              <span className="text-[#A0A0A0] text-sm whitespace-nowrap">bpm</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <button
                type="button"
                onClick={() => setShowFcmaxTip(v => !v)}
                className="text-xs transition-colors duration-200"
                style={{ color: '#6A00FF' }}
              >
                {showFcmaxTip ? '▲' : '▼'} Comment trouver ma FCmax ?
              </button>
              <button
                type="button"
                onClick={handleUnknownFcmax}
                className="text-xs text-[#F4804A] hover:text-orange-300 transition-colors duration-200"
              >
                Je ne connais pas
              </button>
            </div>
            {showFcmaxTip && (
              <div className="mt-2 text-xs text-[#A0A0A0] bg-[#1A1A1A] rounded-lg p-3 border border-[#2A2A2A]">
                Réalise un effort maximal (sprint final d'une course ou test Vameval). La valeur la plus haute affichée sur ta montre est ta FCmax.
              </div>
            )}
            {unknownFcmax && (
              <p className="text-xs text-[#F4804A] mt-1">Ce champ sera considéré comme vide — tu recevras une alerte avec des recommandations.</p>
            )}
          </div>

          {/* VMA */}
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">
              Ta vitesse maximale aérobie (VMA)
            </label>
            <p className="text-[#A0A0A0] text-xs mb-2">Ta vitesse lors d'un test Cooper ou demi-Cooper.</p>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="Ex : 14.5"
                min={8}
                max={25}
                step={0.1}
                value={data.vma}
                onChange={handleVmaChange}
                className={unknownVma ? inputWarning : inputNormal}
              />
              <span className="text-[#A0A0A0] text-sm whitespace-nowrap">km/h</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <button
                type="button"
                onClick={() => setShowVmaTip(v => !v)}
                className="text-xs transition-colors duration-200"
                style={{ color: '#6A00FF' }}
              >
                {showVmaTip ? '▲' : '▼'} Comment trouver ma VMA ?
              </button>
              <button
                type="button"
                onClick={handleUnknownVma}
                className="text-xs text-[#F4804A] hover:text-orange-300 transition-colors duration-200"
              >
                Je ne connais pas
              </button>
            </div>
            {showVmaTip && (
              <div className="mt-2 text-xs text-[#A0A0A0] bg-[#1A1A1A] rounded-lg p-3 border border-[#2A2A2A]">
                Test Cooper : cours le plus loin possible en 12 minutes. Distance (en m) ÷ 200 = VMA en km/h. Exemple : 2800m → VMA = 14 km/h.
              </div>
            )}
            {unknownVma && (
              <p className="text-xs text-[#F4804A] mt-1">Ce champ sera considéré comme vide — tu recevras une alerte avec des recommandations.</p>
            )}
          </div>

          {/* Distance */}
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">
              La distance que tu prépares
            </label>
            <select
              value={data.distance}
              onChange={e => setData(prev => ({ ...prev, distance: e.target.value }))}
              className="w-full bg-[#1A1A1A] text-white rounded-lg px-4 py-3 border border-[#2A2A2A] focus:border-[#6A00FF] outline-none transition-all duration-200"
            >
              {DISTANCE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Profil */}
          <div>
            <label className="block text-white font-semibold mb-1 text-sm">
              Ton profil de coureur
            </label>
            <select
              value={data.profil}
              onChange={e => setData(prev => ({ ...prev, profil: e.target.value }))}
              className="w-full bg-[#1A1A1A] text-white rounded-lg px-4 py-3 border border-[#2A2A2A] focus:border-[#6A00FF] outline-none transition-all duration-200"
            >
              {PROFIL_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-4 text-lg font-bold text-white rounded-lg transition-all duration-200"
            style={{ backgroundColor: '#6A00FF' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#5500CC'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#6A00FF'}
          >
            Générer mon plan →
          </button>
        </form>
      </div>
    </div>
  )
}
