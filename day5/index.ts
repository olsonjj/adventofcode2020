import { boardingPasses } from './input';
import { parseInput } from '../utils/input-utils';

const passes = parseInput(boardingPasses);

const getPassInfo = (
  pass: string
): { row: number; column: number; seatId: number } => {
  const ranges = pass.split('').reduce(
    (range, char) => {
      switch (char) {
        case 'F':
          range.rowMax = Math.floor((range.rowMax + range.rowMin) / 2);
          break;
        case 'B':
          range.rowMin = Math.ceil((range.rowMax + range.rowMin) / 2);
          break;
        case 'L':
          range.columnMax = Math.floor((range.columnMax + range.columnMin) / 2);
          break;
        case 'R':
          range.columnMin = Math.ceil((range.columnMax + range.columnMin) / 2);
          break;
      }
      return range;
    },
    { rowMin: 0, rowMax: 127, columnMin: 0, columnMax: 7 }
  );
  return {
    row: ranges.rowMin,
    column: ranges.columnMin,
    seatId: ranges.rowMin * 8 + ranges.columnMin,
  };
};

// see the plane seats
let plane = Array(128).fill('________');

const highestId = passes.reduce((highest, pass) => {
  const info = getPassInfo(pass);
  let row: string[] = plane[info.row].split('');
  row[info.column] = 'X';
  plane[info.row] = row.join('');
  return info.seatId > highest ? info.seatId : highest;
}, 0);

console.log('Part 1', highestId);

console.log('See the plane');
console.log(plane.join('\n'));

plane.forEach((row: string, index) => {
  // look for row with only one empty seat
  const firstIdx = row.indexOf('_');
  if (firstIdx !== -1 && firstIdx === row.lastIndexOf('_')) {
    console.log('My seat ID: ', index * 8 + firstIdx);
  }
});
