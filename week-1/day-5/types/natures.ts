import type { StatName } from "./pokemon.js";

export type PokemonNature =
  | "Adamant"
  | "Bashful"
  | "Bold"
  | "Brave"
  | "Calm"
  | "Careful"
  | "Docile"
  | "Gentle"
  | "Hardy"
  | "Hasty"
  | "Impish"
  | "Jolly"
  | "Lax"
  | "Lonely"
  | "Mild"
  | "Modest"
  | "Naive"
  | "Naughty"
  | "Quiet"
  | "Quirky"
  | "Rash"
  | "Relaxed"
  | "Sassy"
  | "Serious"
  | "Timid";

export type NatureEffectivenessMultiplier = 1.1 | 1.0 | 0.9;

export type NatureModifiers = Partial<
  Record<StatName, NatureEffectivenessMultiplier>
>;

export const NATURE_MODIFIER_MATRIX: Record<PokemonNature, NatureModifiers> = {
  Adamant: { atk: 1.1, spA: 0.9 },
  Bashful: {},
  Bold: { def: 1.1, atk: 0.9 },
  Brave: { atk: 1.1, spe: 0.9 },
  Calm: { spD: 1.1, atk: 0.9 },
  Careful: { spD: 1.1, spA: 0.9 },
  Docile: {},
  Gentle: { spD: 1.1, def: 0.9 },
  Hardy: {},
  Hasty: { spe: 1.1, def: 0.9 },
  Impish: { def: 1.1, spA: 0.9 },
  Jolly: { spe: 1.1, spA: 0.9 },
  Lax: { def: 1.1, spD: 0.9 },
  Lonely: { atk: 1.1, def: 0.9 },
  Mild: { spA: 1.1, def: 0.9 },
  Modest: { spA: 1.1, atk: 0.9 },
  Naive: { spe: 1.1, spD: 0.9 },
  Naughty: { atk: 1.1, def: 0.9 },
  Quiet: { spA: 1.1, spe: 0.9 },
  Quirky: {},
  Rash: { spA: 1.1, spD: 0.9 },
  Relaxed: { def: 1.1, spe: 0.9 },
  Sassy: { spD: 1.1, spe: 0.9 },
  Serious: {},
  Timid: { spe: 1.1, atk: 0.9 },
} as const;
