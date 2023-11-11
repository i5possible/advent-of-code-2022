import { readData } from "../fileUtils";
const data = readData("./day1/input.txt");

const sum = (a: number, b: number): number => a + b;
const sortDesc = (a: number, b: number): number => b - a;

const topThree = data
  ?.split("\n\n")
  .map((group) =>
    group
      .split("\n")
      .map((line) => parseInt(line))
      .reduce(sum)
  )
  .sort(sortDesc)
  .slice(0, 3)
  .reduce(sum);

console.log(topThree);
// 197400
