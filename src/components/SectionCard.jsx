const phaseColors = {
  depart: '#F4804A',
  milieu: '#6A00FF',
  finish: '#2DC653'
}

export default function SectionCard({ section }) {
  const borderColor = phaseColors[section.phase] || '#6A00FF'

  return (
    <div
      className="rounded-lg p-5 mb-4"
      style={{
        backgroundColor: '#1A1A1A',
        borderLeft: `4px solid ${borderColor}`
      }}
    >
      <h4 className="text-white font-bold mb-1">{section.name}</h4>
      <p className="text-[#A0A0A0] text-sm mb-3">{section.description}</p>
      <div className="flex flex-wrap gap-4 mb-3">
        <div>
          <span className="text-[#A0A0A0] text-xs">🏃 Allure</span>
          <div className="text-white font-bold">{section.pace} /km</div>
        </div>
        <div>
          <span className="text-[#A0A0A0] text-xs">❤️ FC</span>
          <div className="text-white font-bold">{section.fc.min} – {section.fc.max} bpm</div>
        </div>
      </div>
      <div
        className="rounded-lg p-3 text-sm text-[#A0A0A0] leading-relaxed"
        style={{ backgroundColor: 'rgba(106, 0, 255, 0.12)' }}
      >
        💡 {section.tip}
      </div>
    </div>
  )
}
