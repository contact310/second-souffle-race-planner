export default function PaceRange({ paceRange }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-white mb-4">Tes allures de référence</h3>
      <div
        className="rounded-lg overflow-hidden"
        style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}
      >
        <div className="flex items-center gap-4 px-5 py-4 border-b border-[#2A2A2A]">
          <span className="text-green-400 text-xl">🟢</span>
          <div className="flex-1">
            <div className="text-white font-semibold">{paceRange.prudent} /km</div>
            <div className="text-[#A0A0A0] text-xs">Allure prudente — Si ça semble dur dès le départ</div>
          </div>
        </div>
        <div
          className="flex items-center gap-4 px-5 py-4 border-b border-[#2A2A2A]"
          style={{ backgroundColor: 'rgba(106, 0, 255, 0.12)' }}
        >
          <span className="text-xl">🎯</span>
          <div className="flex-1">
            <div className="text-white font-bold text-lg">{paceRange.cible} /km</div>
            <div className="text-xs font-medium" style={{ color: '#6A00FF' }}>Allure cible — Ton objectif, tiens-toi à ça</div>
          </div>
        </div>
        <div className="flex items-center gap-4 px-5 py-4">
          <span className="text-red-400 text-xl">🔴</span>
          <div className="flex-1">
            <div className="text-white font-semibold">{paceRange.limite} /km</div>
            <div className="text-[#A0A0A0] text-xs">Allure limite — Ne dépasse jamais ça en début de course</div>
          </div>
        </div>
      </div>
    </div>
  )
}
