import fs from 'fs';
const elements = fs.readFileSync('./day3/input.txt').toString().split("\n")
  .map(line => line.split(""));


const columns = elements[0].length

const getColumn = (rows: Array<string[]>, idx: number) => rows.map(line => line[idx])

const getCounts = (x: string[]) => x.reduce(({ zeros, ones }, x) =>
  x === '0' ?
    { zeros: zeros + 1, ones } :
    { zeros, ones: ones + 1 }, { zeros: 0, ones: 0 })

const getMax = ({ zeros, ones }: { zeros: number, ones: number }) => zeros > ones ? 0 : 1
const getMin = ({ zeros, ones }: { zeros: number, ones: number }) => zeros <= ones ? 0 : 1

const parseArray = (arr: number[]) => {
  return arr.reduce((acc, val) => {
    return (acc << 1) | val;
  });
};


const getValues = (fn: (x: { zeros: number, ones: number }) => number) =>
  Array(columns).fill(0).map((_, idx) => fn(getCounts(getColumn(elements, idx))))

const gamma = parseArray(getValues(getMax))
const episilon = parseArray(getValues(getMin))

console.log("result1", gamma, episilon, gamma * episilon)


const getOtherValues = (fn: (x: { zeros: number, ones: number }) => number) =>
  Array(columns).fill(0).reduce(({ rows, values }: { rows: Array<string[]>, values: number[] }, _, idx) => {
    if (values !== null) {
      return { values, rows }
    }
    const value = fn(getCounts(getColumn(rows, idx)));
    const nextRows = rows.filter(row => row[idx] === (value === 0 ? '0' : '1'));
    if (nextRows.length === 1) {
      return { values: nextRows[0], rows: nextRows }
    }
    return { values: null, rows: nextRows }
  }, { rows: elements, values: null }).values

const oxygen = parseArray(getOtherValues(getMax))
const co2 = parseArray(getOtherValues(getMin))

console.log("result2", oxygen, co2, oxygen * co2)
