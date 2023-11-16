import { readLines } from '../fileUtils';

const lines = readLines('./day10/input.txt')!;

let signalSum = 0;
let registerValue = 1;
let cycles = 0;
let duration = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const [instruction, valueStr] = line.split(' ');
  const value = valueStr ? parseInt(valueStr, 10) : 0;
  // console.log(instruction, value);
  switch (instruction) {
    case 'addx':
      cycles += 2;
      registerValue += value;
      break;
    case 'noop':
      cycles += 1;
      break;
  }
  const currentDuration = Math.floor((cycles + 20) / 40);
  if (currentDuration !== duration) {
    const signal = (registerValue - value) * (cycles - ((cycles + 20) % 40));
    console.log(`i: ${i}, cycles: ${cycles}`);
    console.log('registerValue:', registerValue - value);
    console.log('signal:', signal);
    signalSum += signal;
    duration = currentDuration;
  }
}

console.log(signalSum);
