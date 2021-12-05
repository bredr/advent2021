import fs from 'fs';
const lines = fs.readFileSync('./day5/input.txt').toString().split("\n");

type point = { x: number, y: number }

type segment = [point, point]
const readLine = (line: string): segment => line.match(/\d+,\d+/g)?.map(l => ({ x: parseInt(l.split(",")[0]), y: parseInt(l.split(",")[1]) })) as [point, point]


const horizontalFilter = ([{ y: y1 }, { y: y2 }]: segment) => y1 === y2;
const verticalFilter = ([{ x: x1 }, { x: x2 }]: segment) => x1 === x2;

const allSegments = lines.map(readLine)
const hvSegments = allSegments.filter(line => horizontalFilter(line) || verticalFilter(line))
const maxX = (segments: Array<segment>) => segments.reduce<number>((acc, [{ x: x1 }, { x: x2 }]) => Math.max(acc, x1, x2), 0) + 1
const maxY = (segments: Array<segment>) => segments.reduce<number>((acc, [{ y: y1 }, { y: y2 }]) => Math.max(acc, y1, y2), 0) + 1

console.log(maxX(hvSegments), maxY(hvSegments))

const emptyGrid = (xLim: number, yLim: number) => Array(xLim).fill(Array(yLim).fill(0))

export const coordinates = ([first, last]: segment): point[] => {
  if (verticalFilter([first, last])) {
    const minY = Math.min(first.y, last.y)
    const maxY = Math.max(first.y, last.y)
    return Array(maxY - minY + 1).fill(null).map((_, idx) => ({ x: first.x, y: idx + minY }))
  }
  if (horizontalFilter([first, last])) {
    const minX = Math.min(first.x, last.x)
    const maxX = Math.max(first.x, last.x)
    return Array(maxX - minX + 1).fill(null).map((_, idx) => ({ x: idx + minX, y: first.y }))
  }

  const m = (first.y - last.y) / (first.x - last.x)
  const minY = Math.min(first.y, last.y)
  const maxY = Math.max(first.y, last.y)
  const minX = Math.min(first.x, last.x)
  const maxX = Math.max(first.x, last.x)
  if (m > 0) {
    return Array(maxX - minX + 1).fill(null).map((_, idx) => ({ x: idx + minX, y: minY + idx }))
  }

  return Array(maxX - minX + 1).fill(null).map((_, idx) => ({ x: idx + minX, y: maxY - idx }))
}


const fillGrid = (segments: Array<segment>) => {
  const points = segments.
    reduce<point[]>((acc, segment) => [...acc, ...coordinates(segment)], []);
  console.log("points", points.length)
  return points.
    reduce<number[][]>((acc, { x, y }) =>
      acc.map((row, xx) => xx === x ? row.map((v, yy) => yy === y ? v + 1 : v) : row)
      , emptyGrid(maxX(segments), maxY(segments)))
}


const overlaps = (grid: number[][]) => grid.reduce((acc, row) => row.reduce((vv, v) => v > 1 ? vv + 1 : vv, acc), 0)
const print = (grid: number[][]) => console.log(grid.map(row => row.join("")).join("\n"))


console.log("result1", overlaps(fillGrid(hvSegments)))

console.log("result2", overlaps(fillGrid(allSegments)))

