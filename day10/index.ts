import fs from "fs";
import {
  autocomplete,
  illegalParens,
  middleScore,
  scoreAutoComplete,
} from "./lib";

const input: string[] = fs
  .readFileSync("./day10/input.txt")
  .toString()
  .split("\n")
  .map((x) => x.trim());

const score: { [key: string]: number } = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const result1 = input.reduce((acc, line) => {
  const result = illegalParens(line);
  return !result ? acc : score[result] + acc;
}, 0);

console.log("result1", result1);

const isNotNull = (x: string | null): x is string => x !== null;

const scores = input
  .filter((line) => illegalParens(line) === null)
  .map((x) => autocomplete(x))
  .filter(isNotNull)
  .map((x) => scoreAutoComplete(x));

const result2 = middleScore(scores);

console.log("result2", result2);
