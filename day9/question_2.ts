import { appendToFile, readLines } from '../fileUtils';

const lines = readLines('./day9/input.txt')!;

type Position = {
  x: number;
  y: number;
};

const head = {
  x: 0,
  y: 0,
};

// rope has ten positions
const rope = Array(10).fill({ ...head });

type MotionResult = {
  rope: Position[];
  tailVisited: Position[];
};

const logPosition = (position: Position) => {
  console.log(`${position.x},${position.y}`);
};

const processMotion = (rope: Position[], motion: string): MotionResult => {
  const [direction, distanceStr] = motion.split(' ');
  const distance = parseInt(distanceStr, 10);
  const tailVisited = [];

  let step = { x: 0, y: 0 };
  switch (direction) {
    case 'R':
      step = {
        x: 1,
        y: 0,
      };
      break;
    case 'L':
      step = {
        x: -1,
        y: 0,
      };
      break;
    case 'U':
      step = {
        x: 0,
        y: 1,
      };
      break;
    case 'D':
      step = {
        x: 0,
        y: -1,
      };
      break;
  }
  let newHead;
  let newRope = [];
  let currentRope = rope;
  // move the rope one step each time
  for (let i = 0; i < distance; i++) {
    newHead = { ...currentRope[0] };
    newRope = [];
    newHead.x += step.x;
    newHead.y += step.y;
    newRope.push({ ...newHead });
    let current = newHead;
    // all the other positions move one step each time following the previous one
    for (let i = 1; i < currentRope.length; i++) {
      const next = { ...currentRope[i] };
      // logPosition(current);
      // logPosition(next);
      const visited = calculateMotion(current, next);
      current = visited.length > 0 ? visited[0] : next;
      newRope.push({ ...current });
    }
    // the last position is the tail
    const tail = current;
    tailVisited.push({ ...tail });
    currentRope = newRope;
  }
  // console.log(newRope);

  return {
    rope: newRope,
    tailVisited,
  };
};

const calculateMotion = (head: Position, tail: Position): Position[] => {
  const result: Position[] = [];
  const xDistance = Math.abs(head.x - tail.x);
  const yDistance = Math.abs(head.y - tail.y);
  const distance = Math.max(xDistance, yDistance);
  if (distance <= 1) {
    return result;
  }
  if (xDistance > 1 && yDistance > 1) {
    // only happens if xDistance === yDistance === 2
    const xStep = (head.x - tail.x) / distance;
    const yStep = (head.y - tail.y) / distance;
    for (let i = 1; i < distance; i++) {
      result.push({
        x: tail.x + xStep * i,
        y: tail.y + yStep * i,
      });
    }
  } else if (xDistance > 1) {
    const step = (head.x - tail.x) / distance;
    for (let i = 1; i < distance; i++) {
      result.push({
        x: tail.x + step * i,
        y: head.y,
      });
    }
  } else {
    const step = (head.y - tail.y) / distance;
    for (let i = 1; i < distance; i++) {
      result.push({
        x: head.x,
        y: tail.y + step * i,
      });
    }
  }
  // result.forEach((position) => {
  //   if(position.x % 1 !== 0 || position.y % 1 !== 0) {
  //     console.log(`${position.x},${position.y}`);
  //     console.log(head.x, head.y, tail.x, tail.y);
  //     throw new Error('Invalid position');
  //   }
  // })
  return result;
};

// For demo input only
const printPositions = (rope: Position[]) => {
  const minX = -11;
  const maxX = 14;
  const minY = -5;
  const maxY = 15;
  for (let y = maxY; y >= minY; y--) {
    let line = '';
    for (let x = minX; x <= maxX; x++) {
      if (rope.find((position) => position.x === x && position.y === y)) {
        line += '#';
      } else {
        line += '.';
      }
    }
    // console.log(line);
  }
};

const processMotions = (rope: Position[], motions: string[]): MotionResult => {
  let tailVisited: Position[] = [];
  let currentRope = rope;
  for (const motion of motions) {
    const result = processMotion(currentRope, motion);
    currentRope = result.rope;
    // printPositions(currentRope);
    result.tailVisited.forEach((position) => {
      if (position.x % 1 !== 0 || position.y % 1 !== 0) {
        console.log(`${position.x},${position.y}`);
      }
    });
    tailVisited = tailVisited.concat(result.tailVisited);
  }
  return {
    rope: currentRope,
    tailVisited,
  };
};

const { tailVisited } = processMotions(rope, lines);
const getUniquePosition = (positions: Position[]): Position[] => {
  const uniquePositionsSet = new Set<string>();
  for (const position of positions) {
    uniquePositionsSet.add(`${position.x},${position.y}`);
  }
  const uniquePositions: Position[] = [];
  // convert string Set to Position Array
  [...uniquePositionsSet].map((position) => {
    const [x, y] = position.split(',');
    uniquePositions.push({
      x: parseInt(x, 10),
      y: parseInt(y, 10),
    });
  });
  return uniquePositions;
};

const getUniquePositionStringArray = (positions: Position[]): string[] => {
  const uniquePositions = new Set<string>();
  for (const position of positions) {
    uniquePositions.add(`${position.x},${position.y}`);
  }
  return [...uniquePositions];
};

const uniquePosition = getUniquePositionStringArray(tailVisited);
console.log(uniquePosition.length);
// printPositions(uniquePosition);
