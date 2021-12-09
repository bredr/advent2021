import { deduceSegmentsMapping } from "./lib";

describe("day8", () => {
  describe("deduceSegmentsMapping", () => {
    const input = [
      "acedgfb",
      "cdfbe",
      "gcdfa",
      "fbcad",
      "dab",
      "cefabd",
      "cdfgeb",
      "eafb",
      "cagedb",
      "ab",
    ];
    it("finds 'a' mapping", () => {
      expect(deduceSegmentsMapping(input)["d"]).toEqual("a");
    });
  });
});
