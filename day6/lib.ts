export const init = (fish: number[]): number[] =>
  fish.reduce(
    (acc, x) => acc.map((n, ix) => (ix === x ? n + 1 : n)),
    Array(9).fill(0)
  );

export const evolve = ([
  zero,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
]: number[]) => [one, two, three, four, five, six, zero + seven, eight, zero];

export const total = (xx: number[]) => xx.reduce((acc, x) => acc + x, 0);
