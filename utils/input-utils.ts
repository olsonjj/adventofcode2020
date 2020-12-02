const parseInput = (input: string): string[] => {
  return input.split('\n');
};

const parseInputAsNumbers = (input: string): number[] => {
  return input.split('\n').map((n) => +n);
};

export { parseInput, parseInputAsNumbers };
