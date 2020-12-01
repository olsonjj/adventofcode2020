import { input } from './input';

const sum2 = (a: number, b: number) => a + b;
const sum3 = (a: number, b: number, c: number) => a + b + c;

// PART 1
// for (let a = 0; a < input.length; a++) {
//   for (let b = a + 1; b < input.length; b++) {
//     if (sum2(input[a], input[b]) === 2020) {
//       console.log('part 1', input[a] * input[b]);
//     }
//   }
// }

// PART 2
// for (let a = 0; a < input.length; a++) {
//   for (let b = a + 1; b < input.length; b++) {
//     for (let c = b + 1; c < input.length; c++) {
//       if (sum3(input[a], input[b], input[c]) === 2020) {
//         console.log('part 2', input[a] * input[b] * input[c]);
//       }
//     }
//   }
// }

// cleaner - part 1
const startA = input.slice();
startA.forEach((numA, index) => {
  const startB = input.slice(index + 1);
  startB.forEach((numB) => {
    if (sum2(numA, numB) === 2020) {
      console.log('part 1 found', numA * numB);
    }
  });
});

// cleaner - part 2
const endA = input.slice();
endA.forEach((numA, indexA) => {
  const endB = input.slice(indexA + 1);
  endB.forEach((numB, indexB) => {
    const endC = input.slice(indexB + 1);
    endC.forEach((numC) => {
      if (sum3(numA, numB, numC) === 2020) {
        console.log('part 2 found', numA * numB * numC);
      }
    });
  });
});

console.log('done');
