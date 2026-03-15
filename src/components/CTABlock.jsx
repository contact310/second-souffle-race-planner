export default function CTABlock({ onBack, backLabel = '← Retour' }) {
  return (
    <div
      className="rounded-xl p-6 md:p-8 mt-8"
      style={{
        backgroundColor: '#0D0010',
        border: '1px solid rgba(106, 0, 255, 0.3)'
      }}
    >
      <h3 className="text-xl font-bold text-white mb-2">
        On peut t'aider à mesurer ça et construire ta stratégie de course.
      </h3>
      <p className="text-[#A0A0A0] mb-6 leading-relaxed">
        En 30 minutes d'appel, nos coachs analysent ton profil et te donnent tes vraies données — et ton plan de course complet.
      </p>
      <a
        href="#"
        className="inline-block w-full text-center py-4 text-lg font-bold text-white rounded-lg transition-all duration-200 mb-4"
        style={{ backgroundColor: '#6A00FF' }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#5500CC'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#6A00FF'}
      >
        Réserver mon appel gratuit →
      </a>
      <p className="text-center text-[#A0A0A0] text-sm mb-4">Sans engagement. Gratuit. 30 minutes.</p>
      {onBack && (
        <button
          onClick={onBack}
          className="w-full text-center text-[#A0A0A0] hover:text-white text-sm transition-colors duration-200 py-2"
        >
          {backLabel}
        </button>
      )}
    </div>
  )
}
