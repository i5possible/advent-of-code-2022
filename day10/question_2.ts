import { readLines } from '../fileUtils'

const lines = readLines('./day10/input.txt')!

let registerValue = 1;
let cycles = 0;
let cache = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const [instruction, valueStr] = line.split(' ');
  const value = valueStr ? parseInt(valueStr, 10) : 0;

  switch (instruction) {
    case "addx":
      for (let j = 0; j < 2; j++) {
        const position = cycles % 40 + 1;
        if (position >= registerValue && position <= registerValue + 2) {
          cache += '#';
        } else {
          cache += '.';
        }
        if (position === 40) {
          // console.log(position, registerValue, value);
          console.log(cache);
          cache = '';
        }
        cycles += 1;
      }
      registerValue += value;
      break;
    case "noop":
      const position = cycles % 40 + 1;
      if (position >= registerValue && position <= registerValue + 2) {
        cache += '#';
      } else {
        cache += '.';
      }
      if (position === 40) {
        // console.log('noop', cycles);
        console.log(cache);
        cache = '';
      }
      cycles += 1;
      break;
  }
}
if (cycles % 40 === 0) {
  console.log(cache);
}

// PLGFKAZG
