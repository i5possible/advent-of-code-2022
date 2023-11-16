import { readLines } from '../fileUtils';
import { sum } from '../reducer';
// const lines = readLines("example_input.txt").filter((line) => line !== "");
const lines = readLines('./day2/input.txt').filter((line) => line !== '');

type OpponentInput = 'A' | 'B' | 'C';
type MyInput = 'X' | 'Y' | 'Z';

const mapOpponentInputToValue = (opponentInput: OpponentInput) =>
  opponentInput.charCodeAt(0) - 64;

const mapMyInputToValue = (myInput: MyInput) => myInput.charCodeAt(0) - 87;

const chooseInput = (
  opponentInput: OpponentInput,
  successInput: MyInput
): MyInput =>
  // Start from 'X'
  // minus 1 for opponentValue
  // minus 2 for successInput as we will map 1,2,3 to -1,0,1
  // as we will mod 3, so no change added
  String.fromCharCode(
    88 +
      ((mapOpponentInputToValue(opponentInput) +
        mapMyInputToValue(successInput)) %
        3)
  ) as MyInput;

const calculateValue = (
  opponentInput: OpponentInput,
  successInput: MyInput
) => {
  const successValue = (mapMyInputToValue(successInput) - 1) * 3;
  const myInput = chooseInput(opponentInput, successInput);
  const myValue = mapMyInputToValue(myInput);
  // console.log(opponentInput, successInput, successValue, myValue);
  return myValue + successValue;
};

const result = lines
  .map((line) => line.split(' '))
  .map(([opponentInput, myInput]) =>
    calculateValue(opponentInput as OpponentInput, myInput as MyInput)
  )
  .reduce(sum);

console.log(result);
// 12881
