import { useState } from 'react'
import Logo from './Logo'

export default function LeadModal({ onSubmit }) {
  const [lead, setLead] = useState({ prenom: '', email: '', phone: '+33' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!lead.prenom.trim()) e.prenom = 'Champ requis'
    if (!lead.email.trim() || !/\S+@\S+\.\S+/.test(lead.email)) e.email = 'Email invalide'
    if (!lead.phone.trim() || lead.phone === '+33') e.phone = 'Numéro requis'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    try {
      await fetch('https://hook.eu2.make.com/9wn2m6sngmnhn5974z2rnrekkg9lt8ty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      })
    } catch (_) {
      // On continue même si le webhook échoue
    }
    onSubmit(lead)
  }

  const inputBase = "w-full bg-[#0F0F0F] text-white rounded-lg px-4 py-3 border outline-none transition-all duration-200 text-sm"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
    >
      <div
        className="w-full max-w-md rounded-xl p-6 md:p-8"
        style={{
          backgroundColor: '#1A1A1A',
          border: '1px solid rgba(106,0,255,0.4)',
          boxShadow: '0 8px 48px rgba(106,0,255,0.25)'
        }}
      >
        <div className="mb-5 flex justify-center">
          <Logo style={{ height: '36px' }} />
        </div>

        <h2 className="text-xl font-bold text-white mb-1 text-center">
          Encore une étape !
        </h2>
        <p className="text-[#A0A0A0] text-sm text-center mb-6">
          Entre tes coordonnées pour recevoir ton plan de course.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Prénom */}
          <div>
            <label className="block text-white text-sm font-semibold mb-1">Prénom</label>
            <input
              type="text"
              placeholder="Ex : Thomas"
              value={lead.prenom}
              onChange={e => setLead(p => ({ ...p, prenom: e.target.value }))}
              className={`${inputBase} ${errors.prenom ? 'border-[#E63946]' : 'border-[#2A2A2A] focus:border-[#6A00FF]'}`}
            />
            {errors.prenom && <p className="text-[#E63946] text-xs mt-1">{errors.prenom}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-white text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="Ex : thomas@email.com"
              value={lead.email}
              onChange={e => setLead(p => ({ ...p, email: e.target.value }))}
              className={`${inputBase} ${errors.email ? 'border-[#E63946]' : 'border-[#2A2A2A] focus:border-[#6A00FF]'}`}
            />
            {errors.email && <p className="text-[#E63946] text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-white text-sm font-semibold mb-1">Téléphone</label>
            <input
              type="tel"
              placeholder="+33 6 12 34 56 78"
              value={lead.phone}
              onChange={e => setLead(p => ({ ...p, phone: e.target.value }))}
              className={`${inputBase} ${errors.phone ? 'border-[#E63946]' : 'border-[#2A2A2A] focus:border-[#6A00FF]'}`}
            />
            {errors.phone && <p className="text-[#E63946] text-xs mt-1">{errors.phone}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-4 text-base font-bold text-white rounded-lg transition-all duration-200 mt-2"
            style={{ backgroundColor: '#6A00FF' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#5500CC'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#6A00FF'}
          >
            Voir mon plan de course →
          </button>

          <p className="text-center text-[#A0A0A0] text-xs">
            Tes données restent confidentielles. Aucun spam.
          </p>
        </form>
      </div>
    </div>
  )
}
