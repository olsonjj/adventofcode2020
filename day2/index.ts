import { rawInput } from './input';
import { parseInput } from '../utils/input-utils';

const input = parseInput(rawInput);
interface SetupFormat {
  range: string;
  letter: string;
  chars: string;
}

const format = (line: string): SetupFormat => {
  // 3-7 r: mxvlzcjrsqst
  const [range, letterPart, chars] = line.split(' ');
  const letter = letterPart.substr(0, 1);
  return { range, letter, chars };
};

const matchCount = (letters: string, char: string) => {
  const match = letters.split('').filter((c) => c === char);
  return match.length;
};

const isInRange = (val: number, range: string) => {
  const [min, max] = range.split('-');
  return val >= +min && val <= +max;
};

const isPasswordValid = (setup: SetupFormat): boolean => {
  // must match only 1 char at each index. index is 1-based
  const [idx1, idx2] = setup.range.split('-');
  const char1 = setup.chars[+idx1 - 1];
  const char2 = setup.chars[+idx2 - 1];
  if (char1 === setup.letter && char2 !== setup.letter) return true;
  if (char1 !== setup.letter && char2 === setup.letter) return true;
  return false;
};

const part1Result = input.reduce(
  (prev, line) => {
    const setup = format(line);
    const matchLen = matchCount(setup.chars, setup.letter);
    const inRange = isInRange(matchLen, setup.range);
    if (inRange) {
      prev.valid++;
    }
    return prev;
  },
  { valid: 0 }
);

const part2Result = input.reduce(
  (prev, line) => {
    const setup = format(line);
    if (isPasswordValid(setup)) {
      prev.valid++;
    }
    return prev;
  },
  { valid: 0 }
);

console.log('Part 1', part1Result.valid);
console.log('Part 2', part2Result.valid);
