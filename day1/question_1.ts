import { readLines } from "../readFile";
const lines = readLines("./day1/input.txt");

let max = 0;
let current = 0;
for (let i = 0; i <= lines.length; i++) {
  // console.log(`${i}:----${lines[i]}---${current}`);
  if (i === lines.length || lines[i] === "") {
    if (max < current) {
      max = current;
    }
    current = 0;
  }
  current += Number(lines[i]);
}
console.log(max);
