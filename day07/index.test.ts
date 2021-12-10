import { lowestCostPosition, costCrab } from "./lib";

describe("day7", () => {
  describe("lowestCostPosition", () => {
    it("gives position", () => {
      expect(lowestCostPosition([16, 1, 2, 0, 4, 2, 7, 1, 2, 14])).toEqual(2);
    });
  });

  describe("costCrab", () => {
    it("give expected", () => {
      expect(costCrab([16, 1, 2, 0, 4, 2, 7, 1, 2, 14], 2)).toEqual(206);
    });
  });
});
