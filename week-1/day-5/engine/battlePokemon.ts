import { POKEDEX, type SpeciesId } from "../data/species.js";
import type {
  PokemonInstance,
  PokemonType,
  StatName,
  StatStages,
} from "../types/pokemon.js";
import {
  calculateRawStat,
  getEffectiveStat,
  type StatStage,
} from "../utils/stats.js";

export class BattlePokemon {
  public speciesId: SpeciesId;
  public types: readonly [PokemonType, PokemonType?];
  public level: number;
  public currentHp: number;
  public maxHp: number;
  public statStages: StatStages;

  private instance: PokemonInstance;

  constructor(set: PokemonInstance) {
    const species = POKEDEX[set.speciesId];

    this.instance = set;
    this.speciesId = set.speciesId;
    this.types = species.types;
    this.level = set.level;
    this.statStages = set.statStage ?? {};

    this.maxHp = calculateRawStat("hp", set);
    this.currentHp = this.maxHp;
  }

  private getRawStat(statName: Exclude<StatName, "hp">): number {
    return calculateRawStat(statName, this.instance);
  }

  public getEffectiveStat(statName: Exclude<StatName, "hp">): number {
    const raw = this.getRawStat(statName);
    const stage: StatStage = this.statStages[statName] ?? 0;
    return getEffectiveStat(raw, stage);
  }
}
