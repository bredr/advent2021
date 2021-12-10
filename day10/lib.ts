const parens = [
  ["(", ")"],
  ["[", "]"],
  ["<", ">"],
  ["{", "}"],
];

export const illegalParens = (
  s: string,
  stack: string[] = []
): string | null => {
  if (s.length === 0) {
    return null;
  }
  if (parens.map(([o]) => o).includes(s[0])) {
    return illegalParens(s.slice(1), [s[0], ...stack]);
  }
  if (stack.length === 0) {
    return s[0];
  }
  if (parens.some(([openP, closeP]) => s[0] === closeP && stack[0] === openP)) {
    return illegalParens(s.slice(1), stack.slice(1));
  }
  return s[0];
};

export const autocomplete = (
  s: string,
  stack: string[] = []
): string | null => {
  if (s.length === 0) {
    if (stack.length === 0) {
      return "";
    }
    return autoCompleteFromStack(stack);
  }
  if (parens.map(([openP]) => openP).includes(s[0])) {
    return autocomplete(s.slice(1), [s[0], ...stack]);
  }
  if (stack.length === 0) {
    return null;
  }
  if (parens.some(([openP, closeP]) => s[0] === closeP && stack[0] === openP)) {
    return autocomplete(s.slice(1), stack.slice(1));
  }
  return null;
};

const autoCompleteFromStack = (stack: string[]) =>
  stack.map((x) => parens.find(([openP]) => openP === x)![1]).join("");

const autoCompleteScores: { [key: string]: number } = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};
export const scoreAutoComplete = (x: string) =>
  x.split("").reduce((acc, s) => acc * 5 + autoCompleteScores[s], 0);

export const middleScore = (scores: number[]) =>
  scores.sort((a, b) => a - b)[(scores.length - 1) / 2];
