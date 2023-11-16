import { readLines } from '../fileUtils';
const lines = readLines('./day4/input.txt');

const checkOverlap = (line: string) => {
  const [first, second] = line.split(',');
  const [firstMin, firstMax] = first.split('-').map((s) => parseInt(s));
  const [secondMin, secondMax] = second.split('-').map((s) => parseInt(s));
  const hasOverlap = !(firstMin > secondMax || firstMax < secondMin);
  console.log(
    `hasOverlap: ${hasOverlap}, firstMin: ${firstMin} - firstMax: ${firstMax}, secondMin: ${secondMin}, secondMax: ${secondMax}`
  );
  return hasOverlap;
};
const result = lines.filter((line) => checkOverlap(line)).length;

console.log(result);

// 843
