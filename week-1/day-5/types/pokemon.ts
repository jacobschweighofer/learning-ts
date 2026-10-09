// StatBlock, PokemonInstance, PokemonType
import type { MoveId } from "../data/moves.js";
import type { SpeciesId } from "../data/species.js";
import type { PokemonNature } from "./natures.js";
import type { StatStage } from "../utils/stats.js";

export type ActiveStatBlock = {
  hp: [current: number, max: number];
  atk: [current: number, max: number];
  def: [current: number, max: number];
  spA: [current: number, max: number];
  spD: [current: number, max: number];
  spe: [current: number, max: number];
};

export type StatBlock = {
  hp: number;
  atk: number;
  def: number;
  spA: number;
  spD: number;
  spe: number;
};

export type StatName = keyof StatBlock;

export interface SpeciesData {
  id: number;
  name: string;
  types: readonly [PokemonType, PokemonType?];
  baseStats: StatBlock;
}

export interface PokemonInstance {
  speciesId: SpeciesId;
  level: number;
  ivs?: Partial<StatBlock>;
  evs?: Partial<StatBlock>;
  statStage?: StatStages;
  moves: [MoveId, MoveId?, MoveId?, MoveId?];
  nature: PokemonNature;
}

export type PokemonType =
  | "Normal"
  | "Fire"
  | "Water"
  | "Grass"
  | "Electric"
  | "Ice"
  | "Fighting"
  | "Poison"
  | "Ground"
  | "Flying"
  | "Psychic"
  | "Bug"
  | "Rock"
  | "Ghost"
  | "Dragon"
  | "Dark"
  | "Steel";

export type StatStages = {
  atk?: StatStage;
  def?: StatStage;
  spA?: StatStage;
  spD?: StatStage;
  spe?: StatStage;
};
