export const lowestCostPosition = (pos: number[]): number => {
  const sorted = pos.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
};

export const cost = (positions: number[], pos: number) =>
  positions.map((x) => Math.abs(x - pos)).reduce((acc, x) => acc + x, 0);

export const costCrab = (positions: number[], pos: number) =>
  positions
    .map((x) => triagularNumber(Math.abs(x - pos)))
    .reduce((acc, x) => acc + x, 0);

const triagularNumber = (x: number) => (x * (x + 1)) / 2;

export const minimise = (
  startingPoint: number,
  fn: (x: number) => number
): number => {
  const current = fn(startingPoint);
  if (fn(startingPoint + 1) <= current) {
    return minimise(startingPoint + 1, fn);
  }
  if (fn(startingPoint - 1) <= current) {
    return minimise(startingPoint - 1, fn);
  }
  return startingPoint;
};
