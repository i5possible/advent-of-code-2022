import { readLines } from '../readFile'

const trees = readLines('./day8/input.txt')
  .map((row) => row.split('')
    .map((char) => parseInt(char)))

let highestScore = 0;
for (let i = 0; i < trees.length; i++) {
  const row = trees[i]
  let positionScore = 1;
  for (let j = 0; j < row.length; j++) {
    const current = row[j];
    let currentScore = 0;
    for (let k = j - 1; k >= 0; k--) {
      const left = row[k];
      currentScore++;
      if (left >= current) {
        break;
      }
    }
    // console.log('left', currentScore);
    positionScore *= currentScore;

    currentScore = 0;
    for (let k = j + 1; k < row.length; k++) {
      const right = row[k];
      currentScore++;
      if (right >= current) {
        break;
      }
    }
    // console.log('right', currentScore);
    positionScore *= currentScore;

    currentScore = 0;
    for (let k = i - 1; k >= 0; k--) {
      const up = trees[k][j];
      currentScore++;
      if (up >= current) {
        break;
      }
    }
    // console.log('up', currentScore);
    positionScore *= currentScore;

    currentScore = 0;
    for (let k = i + 1; k < trees.length; k++) {
      const down = trees[k][j];
      currentScore++;
      if (down >= current) {
        break;
      }
    }
    // console.log('down', currentScore);
    positionScore *= currentScore;
    // console.log(i, j, positionScore, highestScore);
    if (positionScore > highestScore) {
      highestScore = positionScore;
    }
    positionScore = 1;
  }
}

// 284648
console.log(highestScore);
