import fs from 'fs';
const elements: Array<[string, number]> = fs.readFileSync('./day2/input.txt').toString().split("\n").map(line => [line.split(" ")[0], parseInt(line.split(" ")[1])]);


const result1 = elements.reduce(({ depth, horizontal }, [command, x]) => {
  switch (command) {
    case "down":
      return { depth: depth + x, horizontal }
    case "up":
      return { depth: depth - x, horizontal }
    case "forward":
      return { depth: depth, horizontal: horizontal + x }
  }
}, { depth: 0, horizontal: 0 } as any)

console.log("result1", result1)
const { depth, horizontal } = result1;
console.log(depth * horizontal)

const result2 = elements.reduce(({ depth, horizontal, aim }, [command, x]) => {
  switch (command) {
    case "down":
      return { depth, horizontal, aim: aim + x }
    case "up":
      return { depth, horizontal, aim: aim - x }
    case "forward":
      return { depth: depth + x * aim, horizontal: horizontal + x, aim }
  }
}, { depth: 0, horizontal: 0, aim: 0 } as any)


console.log("result2", result2)
const { depth: d2, horizontal: h2 } = result2;
console.log(d2 * h2)