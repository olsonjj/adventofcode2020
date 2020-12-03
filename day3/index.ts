import { forest } from './input';
import { parseInput } from '../utils/input-utils';

const slope = parseInput(forest);
const part1Toboggan = { right: 3, down: 1 };
let currentXPos = 0;

const part1Results = slope.reduce((count, line, index) => {
  const xPos = currentXPos % line.length;
  if (line[xPos] === '#') {
    count++;
  }
  currentXPos += part1Toboggan.right;
  return count;
}, 0);

console.log('Part1: ', part1Results);

interface Toboggan {
  right: number;
  down: number;
  xPos: number;
  trees: number;
}

const tobogganA: Toboggan = { right: 1, down: 1, xPos: 0, trees: 0 };
const tobogganB: Toboggan = { right: 3, down: 1, xPos: 0, trees: 0 };
const tobogganC: Toboggan = { right: 5, down: 1, xPos: 0, trees: 0 };
const tobogganD: Toboggan = { right: 7, down: 1, xPos: 0, trees: 0 };
const tobogganE: Toboggan = { right: 1, down: 2, xPos: 0, trees: 0 };

const allToboggans = [tobogganA, tobogganB, tobogganC, tobogganD, tobogganE];

const isLineValid = (toboggan: Toboggan, idx): boolean => {
  return idx % toboggan.down === 0;
};

const updateTreeCount = (toboggan: Toboggan, line) => {
  const xPos = toboggan.xPos % line.length;
  if (line[xPos] === '#') {
    toboggan.trees++;
  }
  toboggan.xPos += toboggan.right;
  return toboggan;
};

slope.forEach((line, index) => {
  allToboggans.forEach((toboggan) => {
    if (isLineValid(toboggan, index)) {
      updateTreeCount(toboggan, line);
    }
  });
});

let results = 1;
allToboggans.forEach((toboggan) => {
  results *= toboggan.trees;
});

console.log('part 2', results);
