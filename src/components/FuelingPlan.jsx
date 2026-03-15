export default function FuelingPlan({ fueling }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-white mb-4">Ton plan de ravitaillement</h3>

      {/* Eau */}
      <div className="mb-5">
        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span>💧</span> Eau
        </h4>
        <div className="overflow-x-auto">
          <div className="flex gap-3 pb-2" style={{ minWidth: 'max-content' }}>
            {fueling.eau.map((item, i) => (
              <div
                key={i}
                className="rounded-lg p-3 text-center flex-shrink-0"
                style={{
                  backgroundColor: '#1A1A1A',
                  border: '1px solid #2A2A2A',
                  minWidth: '140px',
                  maxWidth: '180px'
                }}
              >
                <div className="font-bold mb-1" style={{ color: '#6A00FF' }}>Km {item.km}</div>
                <div className="text-[#A0A0A0] text-xs leading-relaxed">{item.consigne}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gels */}
      {fueling.gel && fueling.gel.length > 0 && (
        <div className="mb-5">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <span>🍬</span> Gels énergétiques
          </h4>
          <div className="overflow-x-auto">
            <div className="flex gap-3 pb-2" style={{ minWidth: 'max-content' }}>
              {fueling.gel.map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg p-3 text-center flex-shrink-0"
                  style={{
                    backgroundColor: '#1A1A1A',
                    border: '1px solid #2A2A2A',
                    minWidth: '140px',
                    maxWidth: '180px'
                  }}
                >
                  <div className="font-bold mb-1" style={{ color: '#F4804A' }}>Km {item.km}</div>
                  <div className="text-[#A0A0A0] text-xs leading-relaxed">{item.consigne}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sels minéraux */}
      {fueling.selsMineraux && (
        <div
          className="rounded-lg p-4 mb-5"
          style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}
        >
          <h4 className="text-white font-semibold mb-1 flex items-center gap-2">
            <span>🧂</span> Sels minéraux
          </h4>
          <p className="text-[#A0A0A0] text-sm">
            Recommandés pour ton profil. Prends 1 comprimé toutes les heures à partir du km 15. Testés à l'entraînement uniquement.
          </p>
        </div>
      )}

      {/* Conseil général */}
      <div
        className="rounded-lg p-4 mb-4"
        style={{
          backgroundColor: '#1A1A1A',
          borderLeft: '4px solid #6A00FF'
        }}
      >
        <p className="text-white text-sm leading-relaxed">{fueling.conseilGeneral}</p>
      </div>

      {/* Erreur à éviter */}
      <div
        className="rounded-lg p-4"
        style={{
          backgroundColor: 'rgba(244, 128, 74, 0.08)',
          borderLeft: '4px solid #F4804A'
        }}
      >
        <p className="text-sm font-semibold mb-1" style={{ color: '#F4804A' }}>⚠️ Erreur à éviter</p>
        <p className="text-[#A0A0A0] text-sm leading-relaxed">{fueling.erreurAEviter}</p>
      </div>
    </div>
  )
}
