import fs from "fs";
const elements = fs.readFileSync("./day1/input.txt").toString().split("\n");

const result1 = elements.reduce(
  ({ lastValue, increases }, x) => ({
    lastValue: Number.parseInt(x),
    increases: increases + (Number.parseInt(x) > lastValue ? 1 : 0),
  }),
  { lastValue: 0, increases: -1 }
);

console.log("result1", result1);

const result2 = elements.reduce(
  ({ lastValue, increases }, x, idx, arr) => {
    if (idx + 2 < arr.length) {
      const value =
        Number.parseInt(x) +
        Number.parseInt(arr[idx + 1]) +
        Number.parseInt(arr[idx + 2]);
      return {
        lastValue: value,
        increases: increases + (value > lastValue ? 1 : 0),
      };
    } else {
      return { lastValue, increases };
    }
  },
  { lastValue: 0, increases: -1 }
);
console.log("result2", result2);
