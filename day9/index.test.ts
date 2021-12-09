import { allBasinSizes, findAllMinima, findBasin, findBasinSize } from "./lib";

describe("day9", () => {
  const rawInput = `2199943210
                3987894921
                9856789892
                8767896789
                9899965678`;
  const input = rawInput
    .trim()
    .split("\n")
    .map((x) =>
      x
        .trim()
        .split("")
        .map((y) => parseInt(y))
    );

  describe("findAllMinima", () => {
    it("finds them", () => {
      expect(findAllMinima(input)).toEqual([
        [0, 1],
        [0, 9],
        [2, 2],
        [4, 6],
      ]);
    });
  });
  describe("findBasin", () => {
    it("find corner one", () => {
      expect(findBasin(input, [[0, 1]])).toEqual([
        [0, 1],
        [0, 0],
        [1, 0],
      ]);
    });
  });

  describe("findBasinSize", () => {
    it("find corner one", () => {
      expect(findBasinSize(input)([0, 1])).toEqual(3);
    });
  });

  describe("allBasinSizes", () => {
    it("finds them", () => {
      expect(allBasinSizes(input)).toEqual([14, 9, 9, 3]);
    });
  });
});
