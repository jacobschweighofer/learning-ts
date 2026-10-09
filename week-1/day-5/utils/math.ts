/**
 * Gen 4 / Gen 5 pokeRound function.
 * Multiplies by modifier/4096 and applies Gen 4 rounding:
 * Standard floor, but rounds UP only if the fraction is strictly greater than 0.5 (2048/4096).
 */
export const pokeRound = (num: number): number => {
  const remainder = num % 1;
  return remainder > 0.5 ? Math.ceil(num) : Math.floor(num);
};

export const applyModifier = (value: number, modifier: number): number => {
  return pokeRound((value * modifier) / 4096);
};
