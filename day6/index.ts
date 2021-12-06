import fs from "fs";
import { init, evolve, total } from "./lib";

const fish = fs
  .readFileSync("./day6/input.txt")
  .toString()
  .trim()
  .split(",")
  .map((x) => parseInt(x));

const state = init(fish);

const finalState1 = Array(80)
  .fill(0)
  .reduce((acc) => evolve(acc), state);

console.log("result1", total(finalState1));

const finalState2 = Array(256)
  .fill(0)
  .reduce((acc) => evolve(acc), state);

console.log("result2", total(finalState2));
