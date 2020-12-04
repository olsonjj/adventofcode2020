import { rawPassportData } from './input';
import { parseInput } from '../utils/input-utils';

const parseToPassports = (rawData) => {
  const passports = parseInput(rawPassportData).reduce(
    (acc, curr) => {
      if (curr.trim().length === 0) {
        acc.passports.push(acc.temp.join(' '));
        acc.temp = [];
      } else {
        acc.temp = acc.temp.concat(curr);
      }

      return acc;
    },
    { temp: [], passports: [] }
  );

  // move last one over
  passports.passports.push(passports.temp.join(' '));
  passports.temp = [];

  return passports;
};

/*
    byr (Birth Year)
iyr (Issue Year)
eyr (Expiration Year)
hgt (Height)
hcl (Hair Color)
ecl (Eye Color)
pid (Passport ID)
cid (Country ID) - optional
*/
const isPassportValidPartA = (passport: string): boolean => {
  // hcl:5d90f0 cid:270 ecl:#66dc9c hgt:62cm byr:1945 pid:63201172 eyr:2026
  const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].sort();
  const passportKeys = passport
    .split(' ')
    .map((kv) => {
      const [k, v] = kv.split(':');
      return k;
    })
    .filter((k) => k !== 'cid')
    .sort();

  if (requiredKeys.join('') === passportKeys.join('')) return true;
  return false;
};

/*
byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
If cm, the number must be at least 150 and at most 193.
If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
cid (Country ID) - ignored, missing or not.
*/
const isPassportValidPartB = (passport: string): boolean => {
  // hcl:5d90f0 cid:270 ecl:#66dc9c hgt:62cm byr:1945 pid:63201172 eyr:2026
  const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].sort();
  const passportKeys = passport
    .split(' ')
    .filter((kv) => {
      const [k, v] = kv.split(':');
      switch (k) {
        case 'byr':
          return +v >= 1920 && +v <= 2002;
        case 'iyr':
          return +v >= 2010 && +v <= 2020;
        case 'eyr':
          return +v >= 2020 && +v <= 2030;
        case 'hgt':
          const scale = v.substr(-2);
          const height = +v.substr(0, v.length - 2);
          switch (scale) {
            case 'cm':
              return height >= 150 && height <= 193;
            case 'in':
              return height >= 59 && height <= 76;
          }
          break;
        case 'hcl':
          const regex = /^#([0-9a-f]){6}/;
          return regex.test(v);
        case 'ecl':
          const eyes = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
          return eyes.includes(v);
        case 'pid':
          return Number.isInteger(+v) && v.length === 9;
        case 'cid':
          return true;
      }
      return false;
    })
    .map((kv) => {
      const [k, v] = kv.split(':');
      return k;
    })
    .filter((k) => k !== 'cid')
    .sort();
  if (requiredKeys.join('') === passportKeys.join('')) return true;
  return false;
};

const parsed = parseToPassports(rawPassportData);
const part1Count = parsed.passports.reduce((count, passport) => {
  if (isPassportValidPartA(passport)) {
    count++;
  }
  return count;
}, 0);

const part2Count = parsed.passports.reduce((count, passport) => {
  if (isPassportValidPartB(passport)) {
    count++;
  }
  return count;
}, 0);

console.log('part 1 valid', part1Count, 'total: ', parsed.passports.length);
console.log('part 2 valid', part2Count, 'total: ', parsed.passports.length);
