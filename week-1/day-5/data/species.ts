// Base stats, types, & Dex entries (e.g. POKEMON_SPECIES
import type { SpeciesData } from "../types/pokemon.js";

export const POKEDEX = {
  gengar: {
    id: 94,
    name: "Gengar",
    types: ["Ghost", "Poison"],
    baseStats: { hp: 60, atk: 65, def: 60, spA: 130, spD: 75, spe: 110 },
  },
  tyranitar: {
    id: 248,
    name: "Tyranitar",
    types: ["Rock", "Dark"],
    baseStats: { hp: 100, atk: 134, def: 110, spA: 95, spD: 100, spe: 61 },
  },
  armaldo: {
    id: 348,
    name: "Armaldo",
    types: ["Rock", "Bug"],
    baseStats: { hp: 75, atk: 125, def: 100, spA: 70, spD: 80, spe: 45 },
  },
  lucario: {
    id: 448,
    name: "Lucario",
    types: ["Fighting", "Steel"],
    baseStats: { hp: 70, atk: 110, def: 70, spA: 115, spD: 70, spe: 90 },
  },
} satisfies Record<string, SpeciesData>;

export type SpeciesId = keyof typeof POKEDEX;
