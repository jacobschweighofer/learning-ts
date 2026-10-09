// MoveDetails, MoveCategory
import type { PokemonType } from "./pokemon.js";

export type fraction = [numerator: number, denominator: number];
// standard crit ratio is 1/24, +1 is 1/8

export interface BaseMoveDetails {
  name: string;
  type: PokemonType;
  critRatio: fraction;
}

export interface AttackingMoveDetails extends BaseMoveDetails {
  category: "Physical" | "Special";
  power: number;
}

export interface StatusMoveDetails extends BaseMoveDetails {
  category: "Status";
  power?: never; // Status moves do not have a base power
}

export type MoveDetails = AttackingMoveDetails | StatusMoveDetails;
