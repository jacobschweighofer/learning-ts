export interface ParsedArgs {
  attackerId: string;
  defenderId: string;
  moveId: string;
}

// Turn "  Garchomp " into "garchomp" so both input paths behave the same.
export const normalizeId = (value: string): string =>
  value.trim().toLowerCase();

export const parseCliArgs = (): ParsedArgs | null => {
  // process.argv = [nodePath, scriptPath, ...userArgs]
  const [attacker, defender, move] = process.argv.slice(2);

  // Only use CLI args if all three were provided.
  if (!attacker || !defender || !move) return null;

  return {
    attackerId: normalizeId(attacker),
    defenderId: normalizeId(defender),
    moveId: normalizeId(move),
  };
};
