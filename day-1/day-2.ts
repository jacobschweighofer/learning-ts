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
  | "Steel"
  | "Fairy";

type effectivenessMultiplier = 0 | 0.5 | 2;

type TypeChartData = {
  readonly [Attacker in PokemonType]?: {
    readonly [Defender in PokemonType]?: effectivenessMultiplier;
  };
};

const TYPE_CHART: TypeChartData = {
  Normal: { Rock: 0.5, Steel: 0.5, Ghost: 0 },
  Fire: {
    Bug: 2,
    Grass: 2,
    Ice: 2,
    Steel: 2,
    Rock: 0.5,
    Fire: 0.5,
    Water: 0.5,
    Dragon: 0.5,
  },
  Water: { Ground: 2, Rock: 2, Fire: 2, Water: 0.5, Grass: 0.5, Dragon: 0.5 },
  Grass: {
    Ground: 2,
    Rock: 2,
    Water: 2,
    Flying: 0.5,
    Poison: 0.5,
    Bug: 0.5,
    Fire: 0.5,
    Grass: 0.5,
    Dragon: 0.5,
    Steel: 0.5,
  },
  Electric: {
    Flying: 2,
    Water: 2,
    Grass: 0.5,
    Electric: 0.5,
    Dragon: 0.5,
    Ground: 0,
  },
  Ice: {
    Flying: 2,
    Ground: 2,
    Grass: 2,
    Dragon: 2,
    Water: 0.5,
    Ice: 0.5,
    Steel: 0.5,
    Fire: 0.5,
  },
  Fighting: {
    Normal: 2,
    Rock: 2,
    Ice: 2,
    Steel: 2,
    Dark: 2,
    Flying: 0.5,
    Poison: 0.5,
    Bug: 0.5,
    Psychic: 0.5,
    Fairy: 0.5,
    Ghost: 0,
  },
  Poison: {
    Grass: 2,
    Fairy: 2,
    Poison: 0.5,
    Ground: 0.5,
    Rock: 0.5,
    Ghost: 0.5,
    Steel: 0,
  },
  Ground: {
    Poison: 2,
    Rock: 2,
    Fire: 2,
    Electric: 2,
    Steel: 2,
    Bug: 0.5,
    Grass: 0.5,
    Flying: 0,
  },
  Flying: {
    Fighting: 2,
    Bug: 2,
    Grass: 2,
    Rock: 0.5,
    Electric: 0.5,
    Steel: 0.5,
  },
  Psychic: { Fighting: 2, Poison: 2, Psychic: 0.5, Steel: 0.5, Dark: 0 },
  Bug: {
    Grass: 2,
    Psychic: 2,
    Dark: 2,
    Fighting: 0.5,
    Flying: 0.5,
    Poison: 0.5,
    Ghost: 0.5,
    Steel: 0.5,
    Fire: 0.5,
    Fairy: 0.5,
  },
  Rock: {
    Flying: 2,
    Bug: 2,
    Fire: 2,
    Ice: 2,
    Fighting: 0.5,
    Ground: 0.5,
    Steel: 0.5,
  },
  Ghost: { Ghost: 2, Psychic: 2, Dark: 0.5, Normal: 0 },
  Dragon: { Dragon: 2, Steel: 0.5, Fairy: 0 },
  Dark: { Ghost: 2, Psychic: 2, Fighting: 0.5, Dark: 0.5, Fairy: 0.5 },
  Steel: {
    Rock: 2,
    Ice: 2,
    Fairy: 2,
    Steel: 0.5,
    Fire: 0.5,
    Water: 0.5,
    Electric: 0.5,
  },
  Fairy: {
    Fighting: 2,
    Dragon: 2,
    Dark: 2,
    Poison: 0.5,
    Steel: 0.5,
    Fire: 0.5,
  },
};

const getEffectiveness = (
  attacker: PokemonType | readonly PokemonType[],
  defender: PokemonType | readonly PokemonType[],
): number => {
  const attackers: readonly PokemonType[] = Array.isArray(attacker)
    ? attacker
    : [attacker];
  const defenders: readonly PokemonType[] = Array.isArray(defender)
    ? defender
    : [defender];

  let totalEffectiveness = 0;

  for (const atk of attackers) {
    let moveEffectiveness = 1;

    for (const def of defenders) {
      // Look up multiplier, defaulting to 1 if unlisted
      const multiplier = TYPE_CHART[atk]?.[def] ?? 1;
      moveEffectiveness *= multiplier;
    }

    // Keep track of the highest damage move available to the attacker
    totalEffectiveness = Math.max(totalEffectiveness, moveEffectiveness);
  }

  return totalEffectiveness;
};
