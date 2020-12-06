import { customsData } from './input';

const forms = customsData.split('\n');

const groupList = forms.reduce(
  (acc, curr, index) => {
    if (curr.trim().length === 0) {
      acc.groups.push(acc.temp);
      acc.temp = [];
    } else {
      acc.temp = acc.temp.concat(curr);
      if (index === forms.length - 1) {
        acc.groups.push(acc.temp);
      }
    }
    return acc;
  },
  { groups: [], temp: [] }
);

const partACount = groupList.groups.reduce((count: number, group: string[]) => {
  return count + new Set(group.join('')).size;
}, 0);

const partBCount = groupList.groups.reduce((count, group: string[]) => {
  if (group.length === 1) {
    return count + group.join('').length;
  }
  const intersection = group.reduce((acc, curr) => {
    const intersection = acc
      .split('')
      .filter((char) => curr.split('').includes(char));
    return intersection.join('');
  });
  return count + intersection.length;
}, 0);

console.log('Part A group count', partACount);
console.log('Part B group count', partBCount);
