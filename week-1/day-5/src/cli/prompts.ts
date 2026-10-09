import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { normalizeId, type ParsedArgs } from "./parseArgs.js";

// Keep asking until the user types something non-empty.
const ask = async (
  rl: ReturnType<typeof createInterface>,
  question: string,
): Promise<string> => {
  while (true) {
    const answer = normalizeId(await rl.question(question));
    if (answer) return answer;
    console.log("Please enter a value.");
  }
};

// Returns the SAME shape as parseCliArgs, so index.ts can treat them identically.
export const promptUser = async (): Promise<ParsedArgs> => {
  const rl = createInterface({ input, output });

  try {
    const attackerId = await ask(rl, "Attacking Pokémon: ");
    const defenderId = await ask(rl, "Defending Pokémon: ");
    const moveId = await ask(rl, "Move ID: ");
    return { attackerId, defenderId, moveId };
  } finally {
    // Always close, or Node keeps waiting on stdin and never exits.
    rl.close();
  }
};
