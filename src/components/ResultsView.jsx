import { useEffect } from 'react'
import Logo from './Logo'
import SummaryCards from './SummaryCards'
import SectionCard from './SectionCard'
import PaceRange from './PaceRange'
import FuelingPlan from './FuelingPlan'

export default function ResultsView({ plan, onRecalculate }) {
  useEffect(() => {
    const existing = document.querySelector('script[src="https://app.iclosed.io/assets/widget.js"]')
    if (!existing) {
      const script = document.createElement('script')
      script.src = 'https://app.iclosed.io/assets/widget.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Logo />
        </div>

        {/* Bloc 1 — Résumé */}
        <SummaryCards plan={plan} />

        {/* Bloc 2 — Sections */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-white mb-4">Découpage de ta course section par section</h3>
          {plan.sections.map((section, i) => (
            <SectionCard key={i} section={section} />
          ))}
        </div>

        {/* Bloc 3 — Fourchette allures */}
        <PaceRange paceRange={plan.paceRange} />

        {/* Bloc 4 — Ravitaillement */}
        <FuelingPlan fueling={plan.fueling} />

        {/* Bloc 5 — CTA */}
        <div
          className="rounded-xl p-6 md:p-8"
          style={{
            backgroundColor: '#0D0010',
            border: '1px solid rgba(106, 0, 255, 0.3)'
          }}
        >
          <h3 className="text-xl font-bold text-white mb-2">
            Ce plan est un point de départ. Pour aller plus loin :
          </h3>
          <p className="text-[#A0A0A0] mb-6 leading-relaxed">
            Un coach Second Souffle peut construire ton plan d'entraînement complet pour atteindre ce chrono — et t'accompagner jusqu'au jour J.
          </p>

          <div
            className="iclosed-widget"
            data-url="https://app.iclosed.io/e/runninglab/diagnostic-running-lab-1"
            title="Diagnostic Second Souffle 👟"
            style={{ width: '100%', height: '620px' }}
          />

          <button
            onClick={onRecalculate}
            className="w-full text-center text-[#A0A0A0] hover:text-white text-sm transition-colors duration-200 py-2 mt-4"
          >
            ← Recalculer avec d'autres données
          </button>
        </div>
      </div>
    </div>
  )
}
