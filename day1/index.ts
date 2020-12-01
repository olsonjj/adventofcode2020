import { input } from './input';
for (let a = 0; a < input.length; a++) {
  for (let b = a + 1; b < input.length; b++) {
    if (input[a] + input[b] === 2020) {
      console.log('part 1', input[a] * input[b]);
    }
  }
}

for (let a = 0; a < input.length; a++) {
  for (let b = a + 1; b < input.length; b++) {
    for (let c = b + 1; c < input.length; c++) {
      const part2 = input[a] + input[b] + input[c];
      if (part2 === 2020) {
        console.log('part 2', input[a] * input[b] * input[c]);
      }
    }
  }
}

console.log('done');
