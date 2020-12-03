import { forest } from './input';
import { parseInput } from '../utils/input-utils';

const input = parseInput(forest);
const part1Slope = { right: 3, down: 1 };
let currentXPos = 0;

const part1Results = input.reduce(
  (prev, line, index) => {
    const xPos = currentXPos % line.length;
    if (line[xPos] === '#') {
      prev.trees++;
    }
    currentXPos += part1Slope.right;
    return prev;
  },
  { trees: 0 }
);

console.log('Part1: ', part1Results);

interface Slope {
  right: number;
  down: number;
  currXPos: number;
  trees: number;
}

const part2SlopeA: Slope = { right: 1, down: 1, currXPos: 0, trees: 0 };
const part2SlopeB: Slope = { right: 3, down: 1, currXPos: 0, trees: 0 };
const part2SlopeC: Slope = { right: 5, down: 1, currXPos: 0, trees: 0 };
const part2SlopeD: Slope = { right: 7, down: 1, currXPos: 0, trees: 0 };
const part2SlopeE: Slope = { right: 1, down: 2, currXPos: 0, trees: 0 };

const part2Slopes = [
  part2SlopeA,
  part2SlopeB,
  part2SlopeC,
  part2SlopeD,
  part2SlopeE,
];

const isLineValid = (slope: Slope, idx): boolean => {
  return idx % slope.down === 0;
};

input.forEach((line, index) => {
  part2Slopes.forEach((slope) => {
    if (isLineValid(slope, index)) {
      const xPos = slope.currXPos % line.length;
      if (line[xPos] === '#') {
        slope.trees++;
      }
      slope.currXPos += slope.right;
    }
  });
});

let results = 1;
part2Slopes.forEach((slope) => {
  results *= slope.trees;
});

console.log('part 2', results);
