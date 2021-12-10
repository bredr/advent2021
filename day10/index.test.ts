import { illegalParens, autocomplete, scoreAutoComplete } from "./lib";

describe("day10", () => {
  describe("illegalParens", () => {
    [
      { input: "{([(<{}[<>[]}>{[]{[(<()>", output: "}" },
      { input: "[[<[([]))<([[{}[[()]]]", output: ")" },
      { input: "[{[{({}]{}}([{[{{{}}([]", output: "]" },
    ].forEach(({ input, output }, idx) =>
      test(`case ${idx}`, () => {
        expect(illegalParens(input)).toEqual(output);
      })
    );
  });
  describe("autocomplete", () => {
    [{ input: "[({(<(())[]>[[{[]{<()<>>", output: "}}]])})]" }].forEach(
      ({ input, output }, idx) =>
        test(`case ${idx}`, () => {
          expect(autocomplete(input)).toEqual(output);
        })
    );
  });

  describe("scoreAutoComplete", () => {
    test("it works", () => {
      expect(scoreAutoComplete("])}>")).toEqual(294);
    });
  });
});
