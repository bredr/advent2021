const isOne = (x: string) => x.length === 2;
const isFour = (x: string) => x.length === 4;
const isSeven = (x: string) => x.length === 3;
const isEight = (x: string) => x.length === 7;
const isTwoThreeFive = (x: string) => x.length === 5;
const isZeroNineSix = (x: string) => x.length === 6;

export const mapKnowns = (x: string[]) =>
  x.map((s) => {
    if (isOne(s)) return 1;
    if (isFour(s)) return 4;
    if (isSeven(s)) return 7;
    if (isEight(s)) return 8;
    return undefined;
  });

export const countKnowns = (x: (number | undefined)[]) =>
  x.reduce<number>((acc, i) => (i !== undefined ? acc + 1 : acc), 0);

const mapSegments: { [key: string]: number } = {
  abcefg: 0,
  cf: 1,
  acdeg: 2,
  acdfg: 3,
  bcdf: 4,
  abdfg: 5,
  abdefg: 6,
  acf: 7,
  abcdefg: 8,
  abcdfg: 9,
};

export const stringToNumber = (
  mapping: { [key: string]: string },
  signal: string
): number => {
  const k = Object.keys(mapSegments).find((y) =>
    equal(
      y,
      signal
        .split("")
        .map((x) => mapping[x])
        .join("")
    )
  )!;
  return mapSegments[k];
};

const intersect = (a: string, b: string) =>
  a.split("").filter((x) => b.includes(x));
const minus = (a: string, b: string) =>
  a.split("").filter((x) => !b.includes(x));
const equal = (a: string, b: string) =>
  a.split("").every((x) => b.includes(x)) && a.length === b.length;

export const deduceSegmentsMapping = (x: string[]) => {
  const seven = x.find(isSeven)!;
  const one = x.find(isOne)!;
  const four = x.find(isFour)!;
  const eight = x.find(isEight)!;
  const twoThreeFive = x.filter(isTwoThreeFive);
  const zeroNineSix = x.filter(isZeroNineSix);

  const ecd = [
    ...minus(eight, zeroNineSix[0]),
    ...minus(eight, zeroNineSix[1]),
    ...minus(eight, zeroNineSix[2]),
  ].join("");

  const bfec = [
    ...new Set([
      ...minus(eight, twoThreeFive[0]),
      ...minus(eight, twoThreeFive[1]),
      ...minus(eight, twoThreeFive[2]),
    ]),
  ].join("");
  const mapping: { [key: string]: string[] } = {};
  mapping["a"] = [minus(seven, one)[0]];
  mapping["b"] = intersect(bfec, minus(four, one).join(""));
  mapping["c"] = intersect(ecd, one);
  mapping["d"] = intersect(ecd, minus(four, one).join(""));
  mapping["e"] = intersect(
    ecd,
    minus(minus(eight, four).join(""), seven).join("")
  );
  mapping["f"] = intersect(bfec, one).filter((x) => x !== mapping["c"][0]);
  mapping["g"] = minus(minus(eight, four).join(""), mapping["a"][0]).filter(
    (x) => x !== mapping["e"][0]
  );

  return Object.keys(mapping).reduce<{ [key: string]: string }>(
    (acc, x) => ({ ...acc, [mapping[x][0]]: x }),
    {}
  );
};
