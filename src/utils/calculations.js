import { COEFFICIENTS } from '../data/coefficients'

const speedToPace = (speedKmH) => {
  const totalSecondsPerKm = 3600 / speedKmH
  const minutes = Math.floor(totalSecondsPerKm / 60)
  const seconds = Math.round(totalSecondsPerKm % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const adjustPace = (basePaceSecondsPerKm, adjustSeconds) => {
  const total = basePaceSecondsPerKm + adjustSeconds
  const min = Math.floor(total / 60)
  const sec = Math.round(total % 60)
  return `${min}:${sec.toString().padStart(2, '0')}`
}

const calculateFC = (fcmax, fcCoeffMin, fcCoeffMax) => ({
  min: Math.round(fcmax * fcCoeffMin),
  max: Math.round(fcmax * fcCoeffMax)
})

const calculateTotalTime = (vma, vmaCoeff, distanceKm) => {
  const speedKmH = vma * vmaCoeff
  const totalMinutes = (distanceKm / speedKmH) * 60
  const hours = Math.floor(totalMinutes / 60)
  const minutes = Math.round(totalMinutes % 60)
  if (hours > 0) return `${hours}h${minutes.toString().padStart(2, '0')}`
  return `${minutes} min`
}

const getSections = (distance, vma, fcmax, coeff) => {
  const basePaceSeconds = 3600 / (vma * coeff.vmaCoeff)

  if (distance === "10km") {
    return [
      {
        name: "Départ — Km 0 à 2", phase: "depart",
        description: "Départ contrôlé. Résiste à l'adrénaline.",
        pace: adjustPace(basePaceSeconds, +10),
        fc: { min: Math.round(fcmax * (coeff.fcCoeffMin - 0.04)), max: Math.round(fcmax * (coeff.fcCoeffMin - 0.01)) },
        tip: "Ne pars pas avec les autres. Ton allure de départ doit te sembler 'trop lente'."
      },
      {
        name: "Corps de course — Km 2 à 8", phase: "milieu",
        description: "Allure cible. Métronome.",
        pace: adjustPace(basePaceSeconds, 0),
        fc: { min: Math.round(fcmax * coeff.fcCoeffMin), max: Math.round(fcmax * coeff.fcCoeffMax) },
        tip: "Surveille ta FC toutes les 2 minutes. Ajuste si tu dépasses le plafond."
      },
      {
        name: "Finish — Km 8 à 10", phase: "finish",
        description: "Accélération progressive si tu as de la réserve.",
        pace: adjustPace(basePaceSeconds, -8),
        fc: { min: Math.round(fcmax * coeff.fcCoeffMax), max: Math.round(fcmax * 0.99) },
        tip: "Donne tout sur le dernier kilomètre. Pas avant."
      }
    ]
  }

  if (distance === "semi") {
    return [
      {
        name: "Départ — Km 0 à 3", phase: "depart",
        description: "Mise en route. FC basse. Corps froid.",
        pace: adjustPace(basePaceSeconds, +15),
        fc: { min: Math.round(fcmax * (coeff.fcCoeffMin - 0.05)), max: Math.round(fcmax * (coeff.fcCoeffMin - 0.02)) },
        tip: "Les 3 premiers km ne se rattrapent pas — un départ trop rapide se paie entre le 15e et le 18e km."
      },
      {
        name: "Construction — Km 3 à 7", phase: "milieu",
        description: "Monte progressivement vers ton allure cible.",
        pace: adjustPace(basePaceSeconds, +5),
        fc: { min: Math.round(fcmax * (coeff.fcCoeffMin - 0.02)), max: Math.round(fcmax * coeff.fcCoeffMin) },
        tip: "Atteins ton allure cible au km 7 — ni avant, ni après."
      },
      {
        name: "Maintien — Km 7 à 18", phase: "milieu",
        description: "Croisière. Allure cible. Économie de foulée.",
        pace: adjustPace(basePaceSeconds, 0),
        fc: { min: Math.round(fcmax * coeff.fcCoeffMin), max: Math.round(fcmax * coeff.fcCoeffMax) },
        tip: "C'est ici que tu gagnes ou perds ta course. Discipline absolue sur l'allure."
      },
      {
        name: "Finish — Km 18 à 21", phase: "finish",
        description: "Tout ce qu'il reste dans les jambes.",
        pace: adjustPace(basePaceSeconds, -10),
        fc: { min: Math.round(fcmax * coeff.fcCoeffMax), max: Math.round(fcmax * 0.98) },
        tip: "Si tu as bien géré les 18 premiers km, le finish est une récompense."
      }
    ]
  }

  if (distance === "marathon") {
    return [
      {
        name: "Départ — Km 0 à 5", phase: "depart",
        description: "Le plus dangereux. Adrénaline maximale. Corps froid.",
        pace: adjustPace(basePaceSeconds, +20),
        fc: { min: Math.round(fcmax * (coeff.fcCoeffMin - 0.06)), max: Math.round(fcmax * (coeff.fcCoeffMin - 0.03)) },
        tip: "Au marathon, les gens qui partent trop vite finissent en marchant au 32e km. Résiste."
      },
      {
        name: "Phase 1 — Km 5 à 15", phase: "milieu",
        description: "Installation dans l'allure. Corps chaud.",
        pace: adjustPace(basePaceSeconds, +8),
        fc: { min: Math.round(fcmax * (coeff.fcCoeffMin - 0.02)), max: Math.round(fcmax * coeff.fcCoeffMin) },
        tip: "Monte progressivement. Tu dois arriver au km 15 en te disant 'ça se passe bien'."
      },
      {
        name: "Phase 2 — Km 15 à 30", phase: "milieu",
        description: "Le cœur du marathon. Allure cible stricte.",
        pace: adjustPace(basePaceSeconds, 0),
        fc: { min: Math.round(fcmax * coeff.fcCoeffMin), max: Math.round(fcmax * coeff.fcCoeffMax) },
        tip: "C'est ici que le marathon se gagne ou se perd. Allure métronome. Chaque km compte."
      },
      {
        name: "Phase 3 — Km 30 à 38", phase: "milieu",
        description: "Le mur. Gestion mentale et physique.",
        pace: adjustPace(basePaceSeconds, +5),
        fc: { min: Math.round(fcmax * (coeff.fcCoeffMin - 0.01)), max: Math.round(fcmax * coeff.fcCoeffMax) },
        tip: "Si tu ressens le mur : ralentis de 10 sec/km pendant 2 km, ça passe souvent."
      },
      {
        name: "Finish — Km 38 à 42,2", phase: "finish",
        description: "Il n'y a plus rien à préserver.",
        pace: adjustPace(basePaceSeconds, -5),
        fc: { min: Math.round(fcmax * coeff.fcCoeffMax), max: Math.round(fcmax * 0.99) },
        tip: "Dernier ravitaillement au 40e km. Ensuite : mental et cœur."
      }
    ]
  }
}

const getFuelingStrategy = (distance, profil) => {
  if (distance === "10km") {
    return {
      eau: [{ km: 5, consigne: "Bois si disponible. 1 à 2 gorgées max. Ne t'arrête pas." }],
      gel: [],
      selsMineraux: false,
      conseilGeneral: "Sur 10 km, l'hydratation est optionnelle si la température est < 20°C. Concentre-toi sur ton allure.",
      erreurAEviter: "Ne bois pas trop tôt — ça crée une gêne gastrique. Attends au moins le km 4."
    }
  }

  if (distance === "semi") {
    return {
      eau: [
        { km: 5, consigne: "Premier ravitaillement. 2 à 3 gorgées. Ne t'arrête pas." },
        { km: 10, consigne: "Ravitaillement clé. Bois correctement. C'est le milieu de course." },
        { km: 15, consigne: "Troisième ravitaillement. Anticipe le finish." },
        { km: 19, consigne: "Dernier ravito. Gorgées courtes. Finish dans 2 km." }
      ],
      gel: profil === "debutant" ? [] : [
        { km: 10, consigne: "1 gel avec de l'eau. Jamais à sec. Goût neutre préférable." }
      ],
      selsMineraux: profil === "competiteur" || profil === "confirme",
      conseilGeneral: "Sur semi, boire régulièrement avant d'avoir soif. La déshydratation est progressive et silencieuse.",
      erreurAEviter: "Ne prends pas de gel si tu n'as pas testé à l'entraînement. L'estomac réagit différemment en course."
    }
  }

  if (distance === "marathon") {
    return {
      eau: [
        { km: 5, consigne: "Premier ravito. Hydratation préventive. 2-3 gorgées." },
        { km: 10, consigne: "Ravito important. Bois plus si chaleur > 18°C." },
        { km: 15, consigne: "Troisième ravito. C'est le moment de vraiment boire." },
        { km: 20, consigne: "Mi-course. Ravito stratégique. Eau + électrolytes si disponibles." },
        { km: 25, consigne: "Début de la zone critique. Hydratation + récupération musculaire." },
        { km: 30, consigne: "Avant le mur. Dernier grand ravito complet." },
        { km: 35, consigne: "Ravito mental autant que physique. 7 km restants." },
        { km: 40, consigne: "Dernier ravito. Gorgées courtes. Finish dans 2,2 km." }
      ],
      gel: [
        { km: 10, consigne: "Gel n°1 avec eau. Énergétique (maltodextrine). Goût testé à l'entraînement." },
        { km: 20, consigne: "Gel n°2. Priorité aux glucides complexes à ce stade." },
        { km: 30, consigne: "Gel n°3 si nécessaire. Caféine possible si tu y es habitué." },
        { km: 37, consigne: "Gel n°4 optionnel. À base de fructose si disponible." }
      ],
      selsMineraux: true,
      conseilGeneral: "Le marathon se nourrit dès le km 10, pas quand tu as faim. Attendre d'avoir faim = trop tard.",
      erreurAEviter: "Ne mange jamais un gel que tu n'as pas testé à l'entraînement. Et toujours avec de l'eau, jamais seul."
    }
  }
}

export const calculateRacePlan = ({ fcmax, vma, distance, profil }) => {
  const coeff = COEFFICIENTS[distance][profil]
  const distanceKm = { "10km": 10, "semi": 21.1, "marathon": 42.2 }[distance]
  const basePaceSeconds = 3600 / (vma * coeff.vmaCoeff)

  return {
    pace: speedToPace(vma * coeff.vmaCoeff),
    paceRange: {
      prudent: adjustPace(basePaceSeconds, +10),
      cible: speedToPace(vma * coeff.vmaCoeff),
      limite: adjustPace(basePaceSeconds, -8)
    },
    fc: calculateFC(fcmax, coeff.fcCoeffMin, coeff.fcCoeffMax),
    totalTime: calculateTotalTime(vma, coeff.vmaCoeff, distanceKm),
    sections: getSections(distance, vma, fcmax, coeff),
    fueling: getFuelingStrategy(distance, profil),
    input: { fcmax, vma, distance, profil }
  }
}
