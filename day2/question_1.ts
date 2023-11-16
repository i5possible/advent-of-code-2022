import { readLines } from '../fileUtils';
import { sum } from '../reducer';
const lines = readLines('./day2/input.txt');

type OpponentInput = 'A' | 'B' | 'C';
type MyInput = 'X' | 'Y' | 'Z';

const mapOpponentInputToValue = (opponentInput: OpponentInput) =>
  opponentInput.charCodeAt(0) - 64;

const mapMyInputToValue = (myInput: MyInput) => myInput.charCodeAt(0) - 87;

// Create a map is another option as it's not much;
// console.log(calculateValue("A", "X"), 4);
// console.log(calculateValue("A", "Y"), 8);
// console.log(calculateValue("A", "Z"), 3);
// console.log(calculateValue("B", "X"), 1);
// console.log(calculateValue("B", "Y"), 5);
// console.log(calculateValue("B", "Z"), 9);
// console.log(calculateValue("C", "X"), 7);
// console.log(calculateValue("C", "Y"), 2);
// console.log(calculateValue("C", "Z"), 6);
const calculateValue = (opponentInput: OpponentInput, myInput: MyInput) => {
  const myValue = mapMyInputToValue(myInput);
  const opponentValue = mapOpponentInputToValue(opponentInput);
  const successValue = ((myValue - opponentValue + 4) % 3) * 3;
  return myValue + successValue;
};

const result = lines
  .map((line) => line.split(' '))
  .map(([opponentInput, myInput]) =>
    calculateValue(opponentInput as OpponentInput, myInput as MyInput)
  )
  .reduce(sum);

console.log(result);
// 13682
