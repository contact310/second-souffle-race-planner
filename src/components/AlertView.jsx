import CTABlock from './CTABlock'

export default function AlertView({ onBack }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0D0010' }}>
      {/* Bandeau rouge */}
      <div
        className="w-full px-4 py-5 text-center font-bold text-white text-lg"
        style={{ backgroundColor: '#E63946' }}
      >
        ALERTE CRITIQUE — Tu cours à l'aveugle
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
          Tu ne connais pas tes données physiologiques.<br />
          <span style={{ color: '#E63946' }}>Tu vas clairement à l'aveugle sur cette course.</span>
        </h2>

        <div className="space-y-4 mb-10">
          {[
            {
              icon: '🎯',
              text: "Sans ta VMA, tu ne peux pas connaître ton allure réelle. Tu partiras soit trop vite (et tu exploseras après le 30e km), soit trop lentement (et tu laisseras du chrono sur la route)."
            },
            {
              icon: '❤️',
              text: "Sans ta FCmax, tu ne peux pas définir tes zones cardiaques. Tu géreras ton effort à la sensation — la méthode la plus risquée en compétition, surtout sur semi et marathon."
            },
            {
              icon: '💥',
              text: "Le résultat le plus fréquent sans ces données : partir à une allure trop optimiste, finir en marchant, ou abandonner. C'est évitable."
            }
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-lg p-5"
              style={{
                backgroundColor: '#1A0A1A',
                borderLeft: '4px solid #E63946'
              }}
            >
              <p className="text-white leading-relaxed">
                <span className="mr-2">{item.icon}</span>{item.text}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-white text-lg mb-8 leading-relaxed font-medium">
          "Ces données se mesurent en 12 minutes.<br />
          Ne pas les connaître avant une course, c'est perdre des semaines<br />
          de préparation en un mauvais départ."
        </p>

        <hr style={{ borderColor: 'rgba(106, 0, 255, 0.3)' }} className="mb-8" />

        <CTABlock
          onBack={onBack}
          backLabel="← Revenir et entrer mes données"
        />
      </div>
    </div>
  )
}
