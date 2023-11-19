import { readData } from '../fileUtils';

const data = readData('./day13/input.txt');

const pairs = data.split('\n\n');

const compare = (left: any, right: any): number => {
  if (typeof left === 'number' && typeof right === 'number') {
    if (left === right) {
      return 0;
    }
    return left < right ? -1 : 1;
  }

  if (typeof left === 'number' && typeof right === 'object') {
    // console.log('number + object', left, right);
    return compare([left], right);
  }

  if (typeof left === 'object' && typeof right === 'number') {
    // console.log('object + number', left, right);
    return compare(left, [right]);
  }

  if (typeof left === 'object' && typeof right === 'object') {
    // console.log('object + object', left, right);
    // will return false if next right is undefined
    let current = 1;
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
      // left is exhausted
      if (left[i] === undefined) {
        return -1;
      }
      // right is exhausted, it depends on previous result
      if (right[i] === undefined) {
        return current;
      }
      const result = compare(left[i], right[i]);
      if (result === 0) {
        current = -1;
        continue;
      }
      return result;
    }
    return -1;
  }
  return 1;
};

const divider1 = [[2]];
const divider2 = [[6]];

const input = pairs
  .map((pair) => {
    const [left, right] = pair.split('\n');
    const jsonLeft = JSON.parse(left);
    const jsonRight = JSON.parse(right);
    return [jsonLeft, jsonRight];
  })
  .flat();

const result = [...input, divider1, divider2].sort(compare);
const index1 = result.indexOf(divider1);
const index2 = result.indexOf(divider2);

// 23049
console.log((index2 + 1) * (index1 + 1));
