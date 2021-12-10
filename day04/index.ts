import fs from "fs";
const lines = fs.readFileSync("./day4/input.txt").toString().split("\n");

const calls = lines[0].split(",").map((x) => parseInt(x));

const boards = lines.reduce<{
  boards: { value: number; taken: boolean }[][][];
  current: number;
}>(
  ({ boards, current }, line, idx) => {
    if (idx < 2) {
      return { boards, current };
    }
    if (boards.length === 0) {
      return {
        boards: [
          [
            line
              .split(" ")
              .map((x) => x.trim())
              .filter((x) => x !== "")
              .map((x) => ({ value: parseInt(x), taken: false })),
          ],
        ],
        current,
      };
    }
    if (line === "") {
      return { boards: [...boards, []], current: current + 1 };
    }

    return {
      boards: [
        ...boards.slice(0, current),
        [
          ...boards[current],
          line
            .split(" ")
            .map((x) => x.trim())
            .filter((x) => x !== "")
            .map((x) => ({ value: parseInt(x), taken: false })),
        ],
      ],
      current,
    };
  },
  { boards: [], current: 0 }
).boards;

console.log(boards.length);

const markBoard = (
  board: { value: number; taken: boolean }[][],
  call: number
) =>
  board.map((x: { value: number; taken: boolean }[]) =>
    x.map(({ value, taken }) =>
      taken ? { value, taken } : { value, taken: value === call }
    )
  );

const isFinished = (board: { value: number; taken: boolean }[][]) =>
  board.some((x) => x.every(({ taken }) => taken)) ||
  Array(board[0].length)
    .fill(0)
    .some((_, idx) => board.map((x) => x[idx]).every(({ taken }) => taken));

const sumOfUnmarked = (board: { value: number; taken: boolean }[][]) =>
  board.reduce(
    (xx, x) => x.reduce((yy, y) => (y.taken ? yy : yy + y.value), xx),
    0
  );

type score = {
  acc: { value: number; taken: boolean }[][];
  value: null | number;
  callidx: number;
};
const score = (board: { value: number; taken: boolean }[][]) =>
  calls.reduce<score>(
    ({ acc, value, callidx }, x, idx) => {
      if (value !== null) {
        return { acc, value, callidx };
      }
      const next = markBoard(acc, x);
      if (isFinished(next)) {
        return { acc: next, value: sumOfUnmarked(next) * x, callidx: idx };
      }
      return { acc: next, value, callidx };
    },
    { acc: board, value: null, callidx: calls.length }
  );

const first = boards
  .map(score)
  .reduce(
    ({ callidx, value, acc }, x) =>
      x.callidx && x.callidx < callidx ? x : { callidx, value, acc },
    { acc: [], value: null, callidx: calls.length }
  );

console.log("result1", first.value);

const last = boards
  .map(score)
  .reduce(
    ({ callidx, value, acc }, x) =>
      x.callidx && x.callidx > callidx ? x : { callidx, value, acc },
    { acc: [], value: null, callidx: 0 }
  );

console.log("result2", last.value);
