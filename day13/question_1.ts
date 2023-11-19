import { readData } from '../fileUtils';

const data = readData('./day13/input.txt');

const pairs = data.split('\n\n');

const isRightOrder = (left: any, right: any): boolean | undefined => {
  if (typeof left === 'number' && typeof right === 'number') {
    if (left === right) {
      return undefined;
    }
    return left < right;
  }

  if (typeof left === 'number' && typeof right === 'object') {
    // console.log('number + object', left, right);
    return isRightOrder([left], right);
  }

  if (typeof left === 'object' && typeof right === 'number') {
    // console.log('object + number', left, right);
    return isRightOrder(left, [right]);
  }

  if (typeof left === 'object' && typeof right === 'object') {
    // console.log('object + object', left, right);
    // will return false if next right is undefined
    let current = false;
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
      // left is exhausted
      if (left[i] === undefined) {
        return true;
      }
      // right is exhausted, it depends on previous result
      if (right[i] === undefined) {
        return current;
      }
      const result = isRightOrder(left[i], right[i]);
      if (result === undefined) {
        current = false;
        continue;
      }
      return result;
    }
    return true;
  }
  return false;
};

const isRightOrderPair = (pair: string): boolean | undefined => {
  const [left, right] = pair.split('\n');
  // console.log(left, right);
  const jsonLeft = JSON.parse(left);
  const jsonRight = JSON.parse(right);
  return isRightOrder(jsonLeft, jsonRight);
};

const sumRightOrderIndex = (pairs: string[]): number => {
  let sum = 0;
  pairs.forEach((pair, index) => {
    const isRight = isRightOrderPair(pair);
    if (isRight) {
      sum += index + 1;
    }
    // console.log(isRight, index + 1);
  });
  return sum;
};

// 6623
console.log(sumRightOrderIndex(pairs));
