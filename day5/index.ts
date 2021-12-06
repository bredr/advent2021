import fs from "fs";
import {
  readLine,
  horizontalFilter,
  verticalFilter,
  fillGrid,
  maxX,
  maxY,
  overlaps,
} from "./lib";
const lines = fs.readFileSync("./day5/input.txt").toString().split("\n");

const allSegments = lines.map(readLine);
const hvSegments = allSegments.filter(
  (line) => horizontalFilter(line) || verticalFilter(line)
);

console.log(maxX(hvSegments), maxY(hvSegments));

console.log("result1", overlaps(fillGrid(hvSegments)));

console.log("result2", overlaps(fillGrid(allSegments)));
