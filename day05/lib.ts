export type point = { x: number; y: number };

export type segment = [point, point];
export const readLine = (line: string): segment =>
  line.match(/\d+,\d+/g)?.map((l) => ({
    x: parseInt(l.split(",")[0]),
    y: parseInt(l.split(",")[1]),
  })) as [point, point];

export const horizontalFilter = ([{ y: y1 }, { y: y2 }]: segment) => y1 === y2;
export const verticalFilter = ([{ x: x1 }, { x: x2 }]: segment) => x1 === x2;

export const maxX = (segments: Array<segment>) =>
  segments.reduce<number>(
    (acc, [{ x: x1 }, { x: x2 }]) => Math.max(acc, x1, x2),
    0
  ) + 1;
export const maxY = (segments: Array<segment>) =>
  segments.reduce<number>(
    (acc, [{ y: y1 }, { y: y2 }]) => Math.max(acc, y1, y2),
    0
  ) + 1;

export const emptyGrid = (xLim: number, yLim: number) =>
  Array(xLim).fill(Array(yLim).fill(0));

export const coordinates = ([first, last]: segment): point[] => {
  if (verticalFilter([first, last])) {
    const minY = Math.min(first.y, last.y);
    const maxY = Math.max(first.y, last.y);
    return Array(maxY - minY + 1)
      .fill(null)
      .map((_, idx) => ({ x: first.x, y: idx + minY }));
  }
  if (horizontalFilter([first, last])) {
    const minX = Math.min(first.x, last.x);
    const maxX = Math.max(first.x, last.x);
    return Array(maxX - minX + 1)
      .fill(null)
      .map((_, idx) => ({ x: idx + minX, y: first.y }));
  }

  const m = (first.y - last.y) / (first.x - last.x);
  const minY = Math.min(first.y, last.y);
  const maxY = Math.max(first.y, last.y);
  const minX = Math.min(first.x, last.x);
  const maxX = Math.max(first.x, last.x);
  if (m > 0) {
    return Array(maxX - minX + 1)
      .fill(null)
      .map((_, idx) => ({ x: idx + minX, y: minY + idx }));
  }

  return Array(maxX - minX + 1)
    .fill(null)
    .map((_, idx) => ({ x: idx + minX, y: maxY - idx }));
};

export const overlaps = (grid: number[][]) =>
  grid.reduce(
    (acc, row) => row.reduce((vv, v) => (v > 1 ? vv + 1 : vv), acc),
    0
  );

export const fillGrid = (segments: Array<segment>) => {
  const points = segments.reduce<point[]>(
    (acc, segment) => [...acc, ...coordinates(segment)],
    []
  );
  console.log("points", points.length);
  return points.reduce<number[][]>(
    (acc, { x, y }) =>
      acc.map((row, xx) =>
        xx === x ? row.map((v, yy) => (yy === y ? v + 1 : v)) : row
      ),
    emptyGrid(maxX(segments), maxY(segments))
  );
};
