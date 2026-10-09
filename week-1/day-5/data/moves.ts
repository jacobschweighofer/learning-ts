// Move database: power, type, category (e.g. MOVE_DEX)
import type { MoveDetails } from "../types/moveTypes.js";

export const moves = {
  stone_edge: {
    name: "Stone Edge",
    power: 100,
    type: "Rock",
    category: "Physical",
    critRatio: [1, 8],
  },
  x_scissor: {
    name: "X-Scissor",
    power: 80,
    type: "Bug",
    category: "Physical",
    critRatio: [1, 24],
  },
  shadow_ball: {
    name: "Shadow Ball",
    power: 80,
    type: "Ghost",
    category: "Special",
    critRatio: [1, 24],
  },
  sludge_bomb: {
    name: "Sludge Bomb",
    power: 90,
    type: "Poison",
    category: "Special",
    critRatio: [1, 24],
  },
  crunch: {
    name: "Crunch",
    power: 80,
    type: "Dark",
    category: "Physical",
    critRatio: [1, 24],
  },
  close_combat: {
    name: "Close Combat",
    power: 120,
    type: "Fighting",
    category: "Physical",
    critRatio: [1, 24],
  },
  flash_cannon: {
    name: "Flash Cannon",
    power: 80,
    type: "Steel",
    category: "Special",
    critRatio: [1, 24],
  },
  aura_sphere: {
    name: "Aura Sphere",
    power: 80,
    type: "Fighting",
    category: "Special",
    critRatio: [1, 24],
  },
  earthquake: {
    name: "Earthquake",
    power: 100,
    type: "Ground",
    category: "Physical",
    critRatio: [1, 24],
  },
} satisfies Record<string, MoveDetails>;

export type MoveId = keyof typeof moves;

/*
typeof moves
JavaScript objects exist at runtime. TypeScript types exist at compile time.typeof moves tells TypeScript: "Inspect the shape of the runtime moves object and turn its structure into a TypeScript type.

"keyof ...
The keyof operator extracts all key names from a type as literal strings.

Because moves has keys like "stone_edge" and "earthquake", TypeScript extracts those exact strings and fuses them into a literal union type:

MoveId = "stone_edge" | "earthquake"
*/
