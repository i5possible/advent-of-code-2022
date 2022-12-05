import { readLines } from "../readFile";
import { sum } from "../reducer";
const lines = readLines("./day3/input.txt");

// console.log(lines.length);
const evaluateProperty = (input: string): number => {
  const value = input.charCodeAt(0) - 96;
  const finalValue = value < 0 ? value + 58 : value;
  console.log(`input: ${input}, finalValue: ${finalValue}`);
  return finalValue;
};

// Double loop
// use Bloom filter if it's really long
const intersect = (first: string, second: string): string =>
  first
    .split("")
    .filter((x) => second.includes(x))
    .join("");

const findSharedItem = (input: string[]) => {
  const common = intersect(intersect(input[0], input[1]), input[2]);
  // console.log(common);
  return common;
};

let result = 0;
for (let i = 0; i < lines.length; i = i + 3) {
  const common = findSharedItem([lines[i], lines[i + 1], lines[i + 2]]);
  const value = evaluateProperty(common);
  result += value;
}

console.log(result);
// 2646
