import { init, evolve } from "./lib";

describe("day6", () => {
  describe("init", () => {
    it("returns counts", () => {
      expect(init([3, 4, 3, 1, 2])).toEqual([0, 1, 1, 2, 1, 0, 0, 0, 0]);
    });
  });
  describe("evolve", () => {
    it("iterates fish lifecycle", () => {
      expect(evolve([0, 1, 1, 2, 1, 0, 0, 0, 0])).toEqual([
        1, 1, 2, 1, 0, 0, 0, 0, 0,
      ]);
      expect(evolve([1, 1, 2, 1, 0, 0, 0, 1, 0])).toEqual([
        1, 2, 1, 0, 0, 0, 2, 0, 1,
      ]);
    });
  });
});
