import Logo from './Logo'

const DISTANCES = [
  { value: '10km',     label: '10 km',         emoji: '⚡' },
  { value: 'semi',     label: 'Semi-marathon',  emoji: '🏃' },
  { value: 'marathon', label: 'Marathon',        emoji: '🏆' },
]

const AVATARS = [
  { initials: 'ML', color: '#6A00FF' },
  { initials: 'CR', color: '#2DC653' },
  { initials: 'SB', color: '#F4804A' },
  { initials: 'TP', color: '#6A00FF' },
]

function SocialProof() {
  return (
    <div className="flex items-center justify-center gap-3 mb-10">
      {/* Avatars empilés */}
      <div className="flex -space-x-2">
        {AVATARS.map((a, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full border-2 border-[#0F0F0F] flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: a.color }}
          >
            {a.initials}
          </div>
        ))}
      </div>
      <p className="text-sm text-[#A0A0A0]">
        <span className="text-white font-semibold">1 247 coureurs</span> ont déjà calculé leur plan
      </p>
    </div>
  )
}

function DistanceBadges({ onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      {DISTANCES.map((d) => (
        <button
          key={d.value}
          onClick={() => onSelect(d.value)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold text-white transition-all duration-200"
          style={{
            borderColor: 'rgba(106,0,255,0.45)',
            backgroundColor: 'rgba(106,0,255,0.10)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(106,0,255,0.25)'
            e.currentTarget.style.borderColor = '#6A00FF'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'rgba(106,0,255,0.10)'
            e.currentTarget.style.borderColor = 'rgba(106,0,255,0.45)'
          }}
        >
          <span>{d.emoji}</span>
          <span>{d.label}</span>
        </button>
      ))}
    </div>
  )
}

function PlanPreview() {
  return (
    <div className="relative w-full max-w-lg mx-auto mt-12 rounded-xl overflow-hidden"
      style={{ border: '1px solid #2A2A2A' }}>

      {/* Contenu mock — partiellement lisible puis flouté */}
      <div className="bg-[#1A1A1A] p-5 select-none pointer-events-none">

        {/* Header du plan */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-[#A0A0A0] uppercase tracking-widest">Ton plan de course</p>
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold text-white"
            style={{ backgroundColor: 'rgba(106,0,255,0.4)' }}>Semi-marathon</span>
        </div>

        {/* 3 métriques */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { icon: '🎯', label: 'Allure cible', value: "4:52 /km" },
            { icon: '❤️', label: 'FC cible',     value: "158–168 bpm" },
            { icon: '🏁', label: 'Temps estimé', value: "1h43" },
          ].map((m, i) => (
            <div key={i} className="rounded-lg p-3 text-center"
              style={{ backgroundColor: '#0F0F0F', borderTop: '2px solid #6A00FF' }}>
              <p className="text-lg mb-0.5">{m.icon}</p>
              <p className="text-white font-bold text-sm">{m.value}</p>
              <p className="text-[#A0A0A0] text-xs">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Section cards (partiellement visibles) */}
        <div className="space-y-2">
          {[
            { phase: 'depart', border: '#F4804A', name: 'Départ — Km 0 à 3', pace: '5:07 /km', fc: '152–161 bpm' },
            { phase: 'milieu', border: '#6A00FF', name: 'Corps de course — Km 7 à 18', pace: '4:52 /km', fc: '158–168 bpm' },
          ].map((s, i) => (
            <div key={i} className="rounded-lg p-3 flex items-center justify-between"
              style={{ backgroundColor: '#0F0F0F', borderLeft: `3px solid ${s.border}` }}>
              <div>
                <p className="text-white text-xs font-semibold">{s.name}</p>
                <p className="text-[#A0A0A0] text-xs mt-0.5">🏃 {s.pace} &nbsp;❤️ {s.fc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dégradé + CTA overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-6"
        style={{
          background: 'linear-gradient(to bottom, transparent 15%, #0F0F0F 55%)',
        }}>
        <div className="text-center px-6">
          <p className="text-white font-bold text-base mb-1">Ton plan personnalisé t'attend</p>
          <p className="text-[#A0A0A0] text-xs mb-4">Allures, FC et ravitaillement calculés sur ta physiologie</p>
          <div className="inline-flex items-center gap-1.5 text-xs text-[#6A00FF] font-semibold animate-pulse">
            <span>⏱</span> Résultat en 30 secondes
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Logo style={{ height: '52px' }} />
        </div>

        {/* Titre */}
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
          Connais-tu vraiment tes allures pour le jour J ?
        </h1>

        {/* Sous-titre */}
        <p className="text-lg text-[#A0A0A0] mb-8 leading-relaxed max-w-xl mx-auto">
          Entre tes données physiologiques. Reçois en 30 secondes ton plan de course complet : allures par section, FC à tenir, et stratégie de ravitaillement.
        </p>

        {/* ① Preuve sociale */}
        <SocialProof />

        {/* ② Badges distance cliquables */}
        <p className="text-sm text-[#A0A0A0] mb-3 -mt-4">
          Choisis ta distance pour commencer →
        </p>
        <DistanceBadges onSelect={(distance) => onStart(distance)} />

        {/* CTA principal */}
        <button
          onClick={() => onStart(null)}
          className="inline-block px-8 py-4 text-lg font-bold text-white rounded-lg transition-all duration-200 shadow-lg"
          style={{
            backgroundColor: '#6A00FF',
            boxShadow: '0 4px 24px rgba(106,0,255,0.35)'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#5500CC'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#6A00FF'}
        >
          Calculer mon plan de course →
        </button>
        <p className="mt-4 text-sm text-[#A0A0A0]">Gratuit. Basé sur ta physiologie réelle.</p>

        {/* ③ Preview flouté */}
        <PlanPreview />

      </div>
    </div>
  )
}
