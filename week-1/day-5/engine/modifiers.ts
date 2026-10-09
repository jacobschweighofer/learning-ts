import { BattlePokemon } from "../engine/battlePokemon.js";
import { moves, type MoveId } from "../data/moves.js";
import type { AttackingMoveDetails, MoveDetails } from "../types/moveTypes.js";
import { printError } from "../utils/errorHandling.js";
import { TYPE_EFFECTIVENESS_MATRIX } from "../data/typeChart.js";
import { applyModifier } from "../utils/math.js";
import { POKEDEX } from "../data/species.js";

export interface DamageContext {
  move: MoveId;
  attacker: BattlePokemon;
  defender: BattlePokemon;
}

export const getMoveData = (moveId: MoveId): MoveDetails => {
  const moveData = moves[moveId];
  if (!moveData) {
    printError(`FATAL ERROR: Invalid Pokémon move ID: ${moveId}`);
    throw new Error(`Invalid move: ${moveId}`);
  }
  return moveData;
};

/**
 * Calculates base damage before variance and final modifiers according to Gen 4 mechanics.
 */
export const calculateGen4BaseDamage = (
  move: AttackingMoveDetails,
  attacker: BattlePokemon,
  defender: BattlePokemon,
): number => {
  const isPhysical = move.category === "Physical";

  const rawAtk = isPhysical
    ? attacker.getEffectiveStat("atk")
    : attacker.getEffectiveStat("spA");
  const rawDef = isPhysical
    ? defender.getEffectiveStat("def")
    : defender.getEffectiveStat("spD");

  // Gen 4 caps effective stat inputs at 999
  const offensiveStat = Math.min(999, Math.max(1, rawAtk));
  const defensiveStat = Math.min(999, Math.max(1, rawDef));

  const power = move.power ?? 0;
  const levelFactor = Math.floor((2 * attacker.level) / 5) + 2;

  // Step 1: Base damage formula -> Floor(((2 * Level / 5 + 2) * Power * Atk / Def) / 50) + 2
  const step1 = Math.floor(
    (levelFactor * power * offensiveStat) / defensiveStat,
  );
  const baseDamage = Math.floor(step1 / 50) + 2;

  return baseDamage;
};

export const getDamageVariance = (ctx: DamageContext): number[] => {
  const moveData = getMoveData(ctx.move);
  if (moveData.category === "Status") return Array(16).fill(0);

  // 1. Calculate Core Unvaried Damage (Base * STAB * Type * Modifiers)
  let damage = calculateGen4BaseDamage(moveData, ctx.attacker, ctx.defender);

  // STAB (Gen 4 uses 6144/4096 modifier internally or 1.5x floor)
  const isStab = ctx.attacker.types.includes(moveData.type);
  if (isStab) {
    damage = applyModifier(damage, 6144);
  }

  // Type Effectiveness
  const defenderMap = TYPE_EFFECTIVENESS_MATRIX[moveData.type];
  if (defenderMap) {
    for (const type of ctx.defender.types) {
      if (!type) continue;
      damage = Math.floor(damage * (defenderMap[type] ?? 1));
    }
  }

  // 2. Apply the 16 variance steps to the calculated total
  return Array.from({ length: 16 }, (_, i) =>
    Math.floor((damage * (85 + i)) / 100),
  );
};

export interface DamageResult {
  rolls: number[];
  minDamage: number;
  maxDamage: number;
  koChance: number;
  isImmune: boolean;
}

export const getFinalDetails = (ctx: DamageContext): DamageResult => {
  const rolls = getDamageVariance(ctx);
  const minDamage = Math.min(...rolls);
  const maxDamage = Math.max(...rolls);

  const isImmune = maxDamage === 0;

  // Calculate KO chance based on how many of the 16 rolls meet or exceed defender's current HP
  const currentHp = ctx.defender.currentHp ?? ctx.defender.maxHp ?? 0;

  if (isImmune || currentHp <= 0) {
    return {
      rolls,
      minDamage,
      maxDamage,
      koChance: currentHp <= 0 ? 100 : 0,
      isImmune,
    };
  }

  const koRolls = rolls.filter((damage) => damage >= currentHp).length;
  const koChance = Number(((koRolls / rolls.length) * 100).toFixed(2));

  return {
    rolls,
    minDamage,
    maxDamage,
    koChance,
    isImmune,
  };
};
