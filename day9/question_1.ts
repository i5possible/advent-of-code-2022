import { readLines } from '../fileUtils'

const lines = readLines('./day9/input.txt')!

type Position = {
  x: number;
  y: number;
};

const head = {
  x: 0,
  y: 0
}
const tail = {
  x: 0,
  y: 0
}

type MotionResult = {
  head: Position;
  tail: Position;
  visited: Position[];
}

const processMotion = (head: Position, tail: Position, motion: string): MotionResult => {
  const [direction, distanceStr] = motion.split(' ');
  const distance = parseInt(distanceStr, 10);
  const newHead = { ...head };

  switch (direction) {
    case "R":
      newHead.x += distance;
      break;
    case "L":
      newHead.x -= distance;
      break;
    case "U":
      newHead.y += distance;
      break;
    case "D":
      newHead.y -= distance;
      break;
  }
  const visited = calculateMotion(newHead, tail);
  const newTail = visited.length > 0 ? visited[visited.length - 1] : { ...tail };
  return {
    head: newHead,
    tail: newTail,
    visited
  }
}

const calculateMotion = (head: Position, tail: Position): Position[] => {
  const result: Position[] = []
  const xDistance = Math.abs(head.x - tail.x)
  const yDistance = Math.abs(head.y - tail.y)
  const distance = Math.max(xDistance, yDistance)
  if (distance <= 1) {
    return result;
  }
  if (xDistance > 1) {
    const step = (head.x - tail.x) / distance;
    for (let i = 1; i < distance; i++) {
      result.push({
        x: tail.x + step * i,
        y: head.y
      })
    }
  } else {
    const step = (head.y - tail.y) / distance;
    for (let i = 1; i < distance; i++) {
      result.push({
        x: head.x,
        y: tail.y + step * i
      })
    }
  }
  return result;
}

const processMotions = (head: Position, tail: Position, motions: string[]): MotionResult => {
  let visited: Position[] = [];
  for (const motion of motions) {
    const result = processMotion(head, tail, motion);
    head = result.head;
    tail = result.tail;
    visited = visited.concat(result.visited);
  }
  return {
    head,
    tail,
    visited
  }
}

const { visited } = processMotions(head, tail, lines);
const countUniquePosition = (positions: Position[]): number => {
  const uniquePositions = new Set<string>();
  for (const position of positions) {
    uniquePositions.add(`${position.x},${position.y}`);
  }
  return uniquePositions.size;
}
// 6090
console.log(countUniquePosition(visited));
