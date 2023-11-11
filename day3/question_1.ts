import { readLines } from "../fileUtils";
import { sum } from "../reducer";
const lines = readLines("./day3/input.txt");

// console.log(lines.length);
const evaluateProperty = (input: string): number => {
  const value = input.charCodeAt(0) - 96;
  const finalValue = value < 0 ? value + 58 : value;
  // console.log(`input: ${input}, finalValue: ${finalValue}`);
  return finalValue;
};

// Double loop
// use Bloom filter if it's really long
const intersect = (first: string, second: string): string =>
  first.split("").find((x) => second.includes(x))!;

const findSharedItem = (input: string) => {
  const firstHalf = input.slice(0, input.length / 2);
  const secondHalf = input.slice(input.length / 2);
  // console.log(`firstHalf: ${firstHalf}, secondHalf: ${secondHalf}`);
  const common = intersect(firstHalf, secondHalf);
  // console.log(common);
  return common;
};

const result = lines
  .map((line) => findSharedItem(line))
  .map((letter) => evaluateProperty(letter))
  .reduce(sum);

console.log(result);
// 7446
