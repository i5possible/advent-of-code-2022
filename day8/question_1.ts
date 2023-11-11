import { readLines } from '../readFile';
const trees = readLines("./day8/input.txt")!;

const rowCount = trees.length;

let visible: boolean[][] = [];
// should only count 1 position once;
// check rows from left and right
for (let i = 0; i < rowCount; i++) {
  let rowVisible: boolean[] = [];
  const row = trees[i];
  // check from left
  let tallest=-1;
  for (let j = 0; j < row.length; j++) {
    // count++ if the current position is the tallest
    const current = parseInt(row[j]);
    // console.log(current, tallest, current > tallest);
    const currentVisible = current > tallest;
    if (currentVisible) {
      tallest = current;
    }
    rowVisible[j] = rowVisible[j] || currentVisible;
  }

  tallest=-1;
  // check from right
  for (let j = row.length - 1; j >= 0; j--) {
    // count++ if the current position is the tallest
    const current = parseInt(row[j]);
    // console.log(current, tallest, current > tallest);
    const currentVisible = current > tallest;
    if (currentVisible) {
      tallest = current;
    }
    rowVisible[j] = rowVisible[j] || currentVisible;
  }
  visible[i] = rowVisible;
}

const columnCount = trees[0].length;
// check columns from top and bottom
for (let i = 0; i < columnCount; i++) {
  // check from left
  let tallest = -1;
  for (let j = 0; j < trees.length; j++) {
    // count++ if the current position is the tallest
    const current = parseInt(trees[j][i]);
    const currentVisible = current > tallest;
    if (currentVisible) {
      tallest = current;
    }
    visible[j][i] = visible[j][i] || currentVisible;
  }
  tallest = -1;
  // check from right
  for (let j = trees.length - 1; j >= 0; j--) {
    // count++ if the current position is the tallest
    const current = parseInt(trees[j][i]);
    const currentVisible = current > tallest;
    if (currentVisible) {
      tallest = current;
    }
    visible[j][i] = visible[j][i] || currentVisible;
  }
}

let visibleCount = 0;
for (let i = 0; i < visible.length; i++) {
  const row = visible[i];
  for (let j = 0; j < row.length; j++) {
    if(row[j]) {
      visibleCount++;
    }
  }
}

// 1733
console.log(visibleCount);

// Another way to solve this problem is to iterate the map and check each position's visibility
