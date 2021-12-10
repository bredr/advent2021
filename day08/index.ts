import fs from "fs";
import {
  countKnowns,
  deduceSegmentsMapping,
  mapKnowns,
  stringToNumber,
} from "./lib";

const input: [string[], string[]][] = fs
  .readFileSync("./day8/input.txt")
  .toString()
  .split("\n")
  .map((x) =>
    x.split("|").map((y) =>
      y
        .trim()
        .split(" ")
        .map((z) => z.trim())
    )
  ) as [string[], string[]][];

const result1 = input.reduce(
  (acc, [_, output]) => acc + countKnowns(mapKnowns(output)),
  0
);

console.log("result1", result1);

const result2 = input.reduce<number>((acc, [input, output]) => {
  const map = deduceSegmentsMapping(input);
  const result = output
    .reverse()
    .reduce((xx, x, ix) => xx + Math.pow(10, ix) * stringToNumber(map, x), 0);
  return acc + result;
}, 0);
console.log("result2", result2);
