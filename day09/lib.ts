export const sumOfRisk = (m: number[][]): number => {
  const xLength = m.length;
  const yLength = m[0].length;
  const getAdjacentCells = adjacentCells(xLength, yLength);
  return Array(xLength)
    .fill(null)
    .reduce<number>(
      (axx, _, ix) =>
        Array(yLength)
          .fill(null)
          .reduce<number>(
            (ayy, _, iy) =>
              getAdjacentCells([ix, iy])
                .map(([x, y]) => m[x][y])
                .every((v) => v > m[ix][iy])
                ? m[ix][iy] + ayy + 1
                : ayy,
            axx
          ),
      0
    );
};

export const findAllMinima = (m: number[][]): coordinate[] => {
  const xLength = m.length;
  const yLength = m[0].length;
  const getAdjacentCells = adjacentCells(xLength, yLength);
  return Array(xLength)
    .fill(null)
    .reduce<coordinate[]>(
      (axx, _, ix) =>
        Array(yLength)
          .fill(null)
          .reduce<coordinate[]>(
            (ayy, _, iy) =>
              getAdjacentCells([ix, iy])
                .map(([x, y]) => m[x][y])
                .every((v) => v > m[ix][iy])
                ? [...ayy, [ix, iy]]
                : ayy,
            axx
          ),
      []
    );
};

export const allBasinSizes = (m: number[][]) =>
  findAllMinima(m)
    .map(findBasinSize(m))
    .sort((a, b) => b - a);

export const findBasinSize =
  (m: number[][]) =>
  (x: coordinate): number =>
    findBasin(m, [x]).length;

export const findBasin = (m: number[][], acc: coordinate[]): coordinate[] => {
  const xLength = m.length;
  const yLength = m[0].length;
  const getAdjacentCells = adjacentCells(xLength, yLength);
  const next = [...acc]
    .reduce<coordinate[]>(
      (xx, x) => [
        ...xx,
        ...getAdjacentCells(x).filter(([i, j]) => m[i][j] < 9),
      ],
      [...acc]
    )
    .reduce<coordinate[]>(
      (xx, [xi, xj]) =>
        xx.some(([i, j]) => i === xi && j === xj) ? xx : [...xx, [xi, xj]],
      []
    );
  if (next.length === acc.length) {
    return next;
  }
  return findBasin(m, next);
};

type coordinate = [number, number];

const adjacentCells =
  (xLength: number, yLength: number) =>
  ([x, y]: coordinate): coordinate[] =>
    [
      [x + 1, y],
      [x - 1, y],
      [x, y - 1],
      [x, y + 1],
    ].filter(
      ([x, y]) => x >= 0 && x < xLength && y >= 0 && y < yLength
    ) as coordinate[];
