type Modifier = number;

function createDamagePipeline(modifiers: readonly Modifier[]) {
  return (baseDamage: number) => {
    return modifiers.reduce((acc, cur) => acc * cur, baseDamage);
  };
}

const applyModifiers = createDamagePipeline([1.5, 0.5, 1.3]);
const output = applyModifiers(100);

console.log(output);
