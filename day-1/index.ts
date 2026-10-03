let digimon = { best: "viximon" };
let pokemon = digimon;

pokemon = { best: "vulpix" };

console.log(digimon.best);
// Initially, digimon and pokemon pointed to the same memory.
// However, reassigning pokemon attaches it to a brand new object in Heap memory,
// leaving digimon pointing to its original object ("viximon").

let digimon2 = { best: "viximon" };
let pokemon2 = digimon2;

pokemon2.best = "vulpix";

console.log(digimon2.best);
// Both digimon2 and pokemon2 point towards the same shared memory.
// However, when you change the value of "best", it impacts both variables,
// as they both still point towards the same object in Heap memory without any reassignment.
// digimon2.best now prints "vulpix".
