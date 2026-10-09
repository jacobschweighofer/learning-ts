// Stat calculation (Base/IV/EV) & Stat Stage lookup tables
import type { PokemonInstance, StatName } from "../types/pokemon.js";
import { NATURE_MODIFIER_MATRIX } from "../types/natures.js";
import { POKEDEX } from "../data/species.js";
import { printError } from "./errorHandling.js";

export type StatStage = -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type statStageMatrix = Record<
  StatStage,
  [numerator: number, denominator: number]
>;

export const STAT_STAGE_MATRIX = {
  [-6]: [2, 8],
  [-5]: [2, 7],
  [-4]: [2, 6],
  [-3]: [2, 5],
  [-2]: [2, 4],
  [-1]: [2, 3],
  [0]: [2, 2],
  [1]: [3, 2],
  [2]: [4, 2],
  [3]: [5, 2],
  [4]: [6, 2],
  [5]: [7, 2],
  [6]: [8, 2],
} as const;

export const calculateRawStat = (
  statName: StatName,
  pokemon: PokemonInstance,
): number => {
  const species = POKEDEX[pokemon.speciesId];
  if (!species) {
    printError(`Species '${pokemon.speciesId}' not found in Pokedex.`);
  }

  const baseStat = species.baseStats[statName];
  const isHP = statName === "hp";

  // 1. Gather values (defaulting missing IVs/EVs to 0/31 as needed)
  const iv = pokemon.ivs?.[statName] ?? 31;
  const ev = pokemon.evs?.[statName] ?? 0;

  // 2. Compute inner sum: 2 * Base + IV + floor(EV / 4)
  const evPart = Math.floor(ev / 4);
  const coreSum = 2 * baseStat + iv + evPart;

  // 3. Scale by level and truncate
  const scaledPart = Math.floor((coreSum * pokemon.level) / 100);

  // 4. HP Branch
  if (isHP) {
    return scaledPart + pokemon.level + 10;
  }

  // 5. Non-HP Branch with Nature modifier
  const statBeforeNature = scaledPart + 5;
  const natureMultiplier = pokemon.nature
    ? (NATURE_MODIFIER_MATRIX[pokemon.nature]?.[statName] ?? 1.0)
    : 1.0;

  return Math.floor(statBeforeNature * natureMultiplier);
};

export const getEffectiveStat = (
  rawStat: number,
  stage: StatStage = 0,
): number => {
  const [numerator, denominator] = STAT_STAGE_MATRIX[stage];
  return Math.floor((rawStat * numerator) / denominator);
};
