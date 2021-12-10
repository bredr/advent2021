import fs from "fs";
import { lowestCostPosition, cost, costCrab, minimise } from "./lib";
const positions = fs
  .readFileSync("./day7/input.txt")
  .toString()
  .trim()
  .split(",")
  .map((x) => parseInt(x));

console.log("result1", cost(positions, lowestCostPosition(positions)));

const fn = (x: number) => costCrab(positions, x);
const p = minimise(lowestCostPosition(positions), fn);
console.log("result2", p, costCrab(positions, p));
