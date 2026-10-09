import { parseCliArgs } from "./src/cli/parseArgs.js";
import { promptUser } from "./src/cli/prompts.js";
import { BattlePokemon } from "./engine/battlePokemon.js";
import { getFinalDetails } from "./engine/modifiers.js";
import type { MoveId } from "./data/moves.js";

const run = async () => {
  // Use CLI args if all 3 were given, otherwise ask interactively.
  const inputs = parseCliArgs() ?? (await promptUser());
  const moveId = inputs.moveId as MoveId;

  console.log(`\n--- Running Damage Calculation ---`);
  console.log(
    `Attacker: ${inputs.attackerId} | Defender: ${inputs.defenderId} | Move: ${inputs.moveId}\n`,
  );

  try {
    const attacker = new BattlePokemon({
      speciesId: inputs.attackerId,
      level: 50,
      nature: "Jolly",
      statStage: { atk: 0 },
      moves: [moveId],
      evs: { hp: 4, atk: 252, spe: 252 },
    });

    const defender = new BattlePokemon({
      speciesId: inputs.defenderId,
      level: 50,
      nature: "Impish",
      statStage: { def: 1 },
      moves: ["crunch"],
      evs: { hp: 252, def: 180, spD: 76 },
    });

    const result = getFinalDetails({ move: moveId, attacker, defender });

    console.log("Damage Rolls:", result.rolls.join(", "));
    console.log(`Damage Range: ${result.minDamage} - ${result.maxDamage}`);
    console.log(`OHKO Chance:   ${result.koChance}%`);
    console.log(`Is Immune:     ${result.isImmune ? "Yes" : "No"}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`\n[CLI Error]: ${message}`);
    process.exitCode = 1;
  }
};

run();
