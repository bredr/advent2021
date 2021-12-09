import fs from "fs";
import { allBasinSizes, sumOfRisk } from "./lib";

const input: number[][] = fs
  .readFileSync("./day9/input.txt")
  .toString()
  .split("\n")
  .map((x) => x.split("").map((y) => parseInt(y)));

console.log("result1", sumOfRisk(input));

const basins = allBasinSizes(input);
basins[0];

console.log("result2", basins[0] * basins[1] * basins[2]);
