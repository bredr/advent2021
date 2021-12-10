import { coordinates } from "./lib";
describe("day5", () => {
  describe("coordinates", () => {
    it("includes initial points", () => {
      expect(
        coordinates([
          { x: 1, y: 1 },
          { x: 1, y: 2 },
        ])
      ).toEqual([
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ]);
    });

    it("includes inbetween vertical", () => {
      expect(
        coordinates([
          { x: 1, y: 1 },
          { x: 1, y: 3 },
        ])
      ).toEqual([
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
      ]);
    });

    it("includes inbetween horizontal", () => {
      expect(
        coordinates([
          { x: 3, y: 1 },
          { x: 1, y: 1 },
        ])
      ).toEqual([
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
      ]);
    });

    it("handles 45 up", () => {
      expect(
        coordinates([
          { x: 1, y: 1 },
          { x: 3, y: 3 },
        ])
      ).toEqual([
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
      ]);

      expect(
        coordinates([
          { x: 3, y: 3 },
          { x: 1, y: 1 },
        ])
      ).toEqual([
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
      ]);
    });
    it("handles 45 down", () => {
      expect(
        coordinates([
          { x: 1, y: 3 },
          { x: 3, y: 1 },
        ])
      ).toEqual([
        { x: 1, y: 3 },
        { x: 2, y: 2 },
        { x: 3, y: 1 },
      ]);

      expect(
        coordinates([
          { x: 3, y: 1 },
          { x: 1, y: 3 },
        ])
      ).toEqual([
        { x: 1, y: 3 },
        { x: 2, y: 2 },
        { x: 3, y: 1 },
      ]);
    });
  });
});
