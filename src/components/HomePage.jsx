export default function HomePage({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <span className="text-3xl font-bold" style={{ color: '#6A00FF' }}>Second Souffle</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Connais-tu vraiment tes allures pour le jour J ?
        </h1>
        <p className="text-lg text-[#A0A0A0] mb-10 leading-relaxed max-w-xl mx-auto">
          Entre tes données physiologiques. Reçois en 30 secondes ton plan de course complet : allures par section, FC à tenir, et stratégie de ravitaillement.
        </p>
        <button
          onClick={onStart}
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
      </div>
    </div>
  )
}
