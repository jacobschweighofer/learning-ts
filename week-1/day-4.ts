type PokemonType =
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

type TypeEffectivenessMultiplier = 0 | 0.5 | 1 | 2;

type TypeEffectivenessChart = {
  readonly [Attacker in PokemonType]?: {
    readonly [Defender in PokemonType]?: TypeEffectivenessMultiplier;
  };
};

const TYPE_EFFECTIVENESS_CHART: TypeEffectivenessChart = {
  Normal: { Rock: 0.5, Steel: 0.5, Ghost: 0 },
  Fire: {
    Grass: 2,
    Ice: 2,
    Bug: 2,
    Steel: 2,
    Fire: 0.5,
    Water: 0.5,
    Rock: 0.5,
    Dragon: 0.5,
  },
  Water: { Fire: 2, Ground: 2, Rock: 2, Water: 0.5, Grass: 0.5, Dragon: 0.5 },
  Grass: {
    Water: 2,
    Ground: 2,
    Rock: 2,
    Fire: 0.5,
    Grass: 0.5,
    Poison: 0.5,
    Flying: 0.5,
    Bug: 0.5,
    Dragon: 0.5,
    Steel: 0.5,
  },
  Electric: {
    Water: 2,
    Flying: 2,
    Grass: 0.5,
    Electric: 0.5,
    Dragon: 0.5,
    Ground: 0,
  },
  Ice: {
    Grass: 2,
    Ground: 2,
    Flying: 2,
    Dragon: 2,
    Fire: 0.5,
    Water: 0.5,
    Ice: 0.5,
    Steel: 0.5,
  },
  Fighting: {
    Normal: 2,
    Ice: 2,
    Rock: 2,
    Dark: 2,
    Steel: 2,
    Poison: 0.5,
    Flying: 0.5,
    Psychic: 0.5,
    Bug: 0.5,
    Ghost: 0,
  },
  Poison: {
    Grass: 2,
    Poison: 0.5,
    Ground: 0.5,
    Rock: 0.5,
    Ghost: 0.5,
    Steel: 0,
  },
  Ground: {
    Fire: 2,
    Electric: 2,
    Poison: 2,
    Rock: 2,
    Steel: 2,
    Grass: 0.5,
    Bug: 0.5,
    Flying: 0,
  },
  Flying: {
    Grass: 2,
    Fighting: 2,
    Bug: 2,
    Electric: 0.5,
    Rock: 0.5,
    Steel: 0.5,
  },
  Psychic: { Fighting: 2, Poison: 2, Psychic: 0.5, Steel: 0.5, Dark: 0 },
  Bug: {
    Grass: 2,
    Psychic: 2,
    Dark: 2,
    Fire: 0.5,
    Fighting: 0.5,
    Poison: 0.5,
    Flying: 0.5,
    Ghost: 0.5,
    Steel: 0.5,
  },
  Rock: {
    Fire: 2,
    Ice: 2,
    Flying: 2,
    Bug: 2,
    Fighting: 0.5,
    Ground: 0.5,
    Steel: 0.5,
  },
  Ghost: { Psychic: 2, Ghost: 2, Dark: 0.5, Normal: 0 },
  Dragon: { Dragon: 2, Steel: 0.5 },
  Dark: { Psychic: 2, Ghost: 2, Fighting: 0.5, Dark: 0.5 },
  Steel: { Ice: 2, Rock: 2, Fire: 0.5, Water: 0.5, Electric: 0.5, Steel: 0.5 },
} as const;

type PokemonMoveCategory = "Special" | "Physical" | "Status";

type DamagingMove = {
  MoveID: number;
  Name: string;
  Typing: PokemonType;
  Category: PokemonMoveCategory;
  Power: number;
};

type StatusMove = {
  MoveID: number;
  Name: string;
  Typing: PokemonType;
  Category: "Status";
  Power?: never;
};

type StatStage = -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6;

type StatStages = {
  Attack?: StatStage;
  Defense?: StatStage;
  SpAttack?: StatStage;
  SpDefence?: StatStage;
  Speed?: StatStage;
};

type BaseStats = {
  HP: number;
  Attack: number;
  Defense: number;
  SpAttack: number;
  SpDefence: number;
  Speed: number;
};

type PokemonEntry = {
  PokemonID: number;
  Level: number;
  Typing: PokemonType | readonly [PokemonType, PokemonType];
  BaseStats: BaseStats;
  Moves: (DamagingMove | StatusMove)[];
  Stages?: StatStages;
  IVs?: Partial<BaseStats>;
  EVs?: Partial<BaseStats>;
};

const STAT_STAGE_MULTIPLIERS: Record<StatStage, [number, number]> = {
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
};

// Converts Base Stat + IVs + EVs into the actual in-game Stat value at a given Level
const calculateStat = (
  base: number,
  level: number,
  isHP = false,
  iv = 31,
  ev = 0,
): number => {
  if (isHP) {
    return (
      Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) +
      level +
      10
    );
  }
  return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5;
};

const Psychic: DamagingMove = {
  MoveID: 1,
  Name: "PSYCHIC",
  Typing: "Psychic",
  Category: "Special",
  Power: 90,
};

const DynamicPunch: DamagingMove = {
  MoveID: 2,
  Name: "DYNAMIC PUNCH",
  Typing: "Fighting",
  Category: "Physical",
  Power: 100,
};

const Alakazam: PokemonEntry = {
  PokemonID: 1,
  Level: 50,
  Typing: "Psychic",
  BaseStats: {
    HP: 55,
    Attack: 50,
    Defense: 45,
    SpAttack: 135,
    SpDefence: 95,
    Speed: 120,
  },
  Moves: [Psychic],
  Stages: { SpAttack: 0 },
};

const Machamp: PokemonEntry = {
  PokemonID: 2,
  Level: 50,
  Typing: "Fighting",
  BaseStats: {
    HP: 90,
    Attack: 130,
    Defense: 80,
    SpAttack: 65,
    SpDefence: 85,
    Speed: 55,
  },
  Moves: [DynamicPunch],
};

const Bronzong: PokemonEntry = {
  PokemonID: 3,
  Level: 50,
  Typing: ["Steel", "Psychic"],
  BaseStats: {
    HP: 67,
    Attack: 89,
    Defense: 116,
    SpAttack: 79,
    SpDefence: 116,
    Speed: 33,
  },
  Moves: [],
  EVs: { HP: 252, SpDefence: 252 },
  IVs: { HP: 31, SpDefence: 31 },
};

const applyStages = (
  attacker: PokemonEntry,
  defender: PokemonEntry,
  move: DamagingMove,
) => {
  const isPhysical = move.Category === "Physical";

  const statKey: keyof BaseStats = isPhysical ? "Attack" : "SpAttack";
  const defStatKey: keyof BaseStats = isPhysical ? "Defense" : "SpDefence";

  const atkStage = isPhysical
    ? (attacker.Stages?.Attack ?? 0)
    : (attacker.Stages?.SpAttack ?? 0);

  const defStage = isPhysical
    ? (defender.Stages?.Defense ?? 0)
    : (defender.Stages?.SpDefence ?? 0);

  const rawAttackerBase = isPhysical
    ? attacker.BaseStats.Attack
    : attacker.BaseStats.SpAttack;
  const rawDefenderBase = isPhysical
    ? defender.BaseStats.Defense
    : defender.BaseStats.SpDefence;

  const atkIV = attacker.IVs?.[statKey] ?? 31;
  const atkEV = attacker.EVs?.[statKey] ?? 0;

  const defIV = defender.IVs?.[defStatKey] ?? 31;
  const defEV = defender.EVs?.[defStatKey] ?? 0;

  const rawOffensiveStat = calculateStat(
    rawAttackerBase,
    attacker.Level,
    false,
    atkIV,
    atkEV,
  );
  const rawDefensiveStat = calculateStat(
    rawDefenderBase,
    defender.Level,
    false,
    defIV,
    defEV,
  );

  const [atkNum, atkDen] = STAT_STAGE_MULTIPLIERS[atkStage];
  const [defNum, defDen] = STAT_STAGE_MULTIPLIERS[defStage];

  const offensiveStat = Math.floor((rawOffensiveStat * atkNum) / atkDen);
  const defensiveStat = Math.floor((rawDefensiveStat * defNum) / defDen);

  return { offensiveStat, defensiveStat };
};

const calculateDamage = (attacker: PokemonEntry, defender: PokemonEntry) => {
  if (!attacker?.PokemonID) throw new Error("No valid attacking Pokemon");
  if (!defender?.PokemonID) throw new Error("No valid defending Pokemon");

  return (move: DamagingMove) => {
    const knowsMove = attacker.Moves.some((m) => m.MoveID === move.MoveID);
    if (!knowsMove) throw new Error("No valid move");

    if (move.Category === "Status" || !move.Power) {
      throw new Error("Move does not deal damage");
    }

    const { offensiveStat, defensiveStat } = applyStages(
      attacker,
      defender,
      move,
    );

    // Official Gen 3-9 damage formula sequence:
    // BaseDamage = Math.floor(Math.floor(Math.floor(2 * Level / 5 + 2) * Power * Atk / Def) / 50) + 2
    const levelFactor = Math.floor((2 * attacker.Level) / 5) + 2;
    const baseProduct = levelFactor * move.Power * offensiveStat;
    const damageRatio = Math.floor(baseProduct / defensiveStat);
    const baseDamage = Math.floor(damageRatio / 50) + 2;

    return applyModifiers(attacker, defender, move, baseDamage);
  };
};

const applyModifiers = (
  attacker: PokemonEntry,
  defender: PokemonEntry,
  move: DamagingMove,
  baseDamage: number,
) => {
  let modifiedDamage = baseDamage;

  const attackerTypes: readonly PokemonType[] =
    typeof attacker.Typing === "string" ? [attacker.Typing] : attacker.Typing;

  const defenderTypes: readonly PokemonType[] =
    typeof defender.Typing === "string" ? [defender.Typing] : defender.Typing;

  // STAB (1.5x)
  if (attackerTypes.includes(move.Typing)) {
    modifiedDamage = Math.floor(modifiedDamage * 1.5);
  }

  // Type effectiveness
  for (const defendType of defenderTypes) {
    const defenderMap = TYPE_EFFECTIVENESS_CHART[move.Typing];
    if (defenderMap) {
      const multiplier = defenderMap[defendType] ?? 1;
      modifiedDamage = Math.floor(modifiedDamage * multiplier);
    }
  }

  // Random factor (85% to 100%)
  const randomRoll = Math.floor(Math.random() * 16) + 85;
  return Math.floor((modifiedDamage * randomRoll) / 100);
};

// Execution
const AlakazamDmg = calculateDamage(Alakazam, Machamp);
const output = AlakazamDmg(Psychic);

console.log(`Damage output: ${output}`);
