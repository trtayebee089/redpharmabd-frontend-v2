import {
  Activity,
  Baby,
  Bandage,
  Bone,
  Brain,
  Droplets,
  Eye,
  FlaskConical,
  HeartPulse,
  Leaf,
  Pill,
  ShieldPlus,
  Sparkles,
  Stethoscope,
  Syringe,
  Thermometer,
} from 'lucide-vue-next'

/**
 * Maps a category name to a lucide icon by keyword, so the navigation reads
 * visually even when the API supplies no category artwork.
 */
const RULES = [
  [/pain|analges|headache|fever|paracet/i, Thermometer],
  [/digest|stomach|gastro|antacid|liver/i, FlaskConical],
  [/vitamin|supplement|nutri|mineral/i, Sparkles],
  [/baby|mother|infant|child|kid/i, Baby],
  [/diabet|insulin|sugar|glucose/i, Droplets],
  [/heart|cardio|blood pressure|hyper/i, HeartPulse],
  [/personal|beauty|skin|hair|cosmet/i, Leaf],
  [/device|equip|monitor|machine|test/i, Stethoscope],
  [/injection|vaccine|syringe|ampoule/i, Syringe],
  [/wound|first aid|bandage|dressing/i, Bandage],
  [/eye|vision|optic|ear|nasal/i, Eye],
  [/bone|joint|calcium|arthrit|muscle/i, Bone],
  [/brain|neuro|sleep|mental|anxiety/i, Brain],
  [/immun|covid|mask|protect|hygiene|sanit/i, ShieldPlus],
  [/respir|asthma|cough|cold|allerg/i, Activity],
]

export function categoryIcon(name = '') {
  const label = String(name || '')
  const match = RULES.find(([pattern]) => pattern.test(label))
  return match ? match[1] : Pill
}

/** Deterministic accent pair so each category keeps a stable colour identity. */
const TINTS = [
  'from-emerald-500/15 to-teal-500/5 text-primary-700',
  'from-sky-500/15 to-cyan-500/5 text-sky-700',
  'from-amber-500/15 to-orange-500/5 text-accent-700',
  'from-violet-500/15 to-fuchsia-500/5 text-violet-700',
  'from-rose-500/15 to-pink-500/5 text-rose-700',
  'from-lime-500/15 to-emerald-500/5 text-lime-700',
]

export function categoryTint(seed = '') {
  const key = String(seed || '')
  let hash = 0
  for (let i = 0; i < key.length; i += 1) hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  return TINTS[hash % TINTS.length]
}
