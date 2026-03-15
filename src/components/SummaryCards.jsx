export default function SummaryCards({ plan }) {
  const distanceLabel = {
    '10km': '10 km',
    'semi': 'Semi-marathon',
    'marathon': 'Marathon'
  }[plan.input.distance]

  return (
    <div className="mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
        Ton plan de course — {distanceLabel}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: '🎯', label: 'Allure cible', value: `${plan.pace} /km` },
          { icon: '❤️', label: 'FC cible', value: `${plan.fc.min} – ${plan.fc.max} bpm` },
          { icon: '🏁', label: 'Temps estimé', value: plan.totalTime }
        ].map((card, i) => (
          <div
            key={i}
            className="rounded-lg p-5 text-center"
            style={{
              backgroundColor: '#1A1A1A',
              borderTop: '3px solid #6A00FF'
            }}
          >
            <div className="text-2xl mb-1">{card.icon}</div>
            <div className="text-[#A0A0A0] text-xs mb-2 uppercase tracking-wide">{card.label}</div>
            <div className="text-white text-2xl font-bold">{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
