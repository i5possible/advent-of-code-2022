import { readData } from '../fileUtils';
const dataStream = readData('./day6/input.txt')!;

console.log(dataStream);

let distinctCharacters = '';
for (let i = 0; i < dataStream.length; i++) {
  const character = dataStream[i];
  if (distinctCharacters.includes(character)) {
    const index = distinctCharacters.indexOf(character);
    distinctCharacters = distinctCharacters.slice(index + 1);
  }
  distinctCharacters += character;
  console.log(`i: ${i}, distinctCharacters: ${distinctCharacters}`);
  if (distinctCharacters.length === 4) {
    console.log(`index: ${i + 1}`);
    break;
  }
}

// 1034
