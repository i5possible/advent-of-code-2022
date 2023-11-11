import { readData } from "../fileUtils";
const lines = readData("./day5/input.txt")!;

const [position, instructions] = lines.split("\n\n");

const parseStackCount = (line: string) => parseInt(line.split("   ").pop()!);
const parseCharacter = (character: string) => character[1];

const parseLine = (rawLine: string, stackCount: number): string[] => {
  const line = [];
  for (let i = 0; i < stackCount; i++) {
    const start = i * 4;
    const end = i * 4 + 3;
    const content = parseCharacter(rawLine.slice(start, end));
    line.push(content);
  }
  return line;
};

const parseStacks = (position: string[]) => {
  const stackCount = parseStackCount(position[position.length - 1]);
  const stacks: string[][] = [];
  for (let i = 0; i < stackCount; i++) {
    stacks.push([]);
  }
  for (let i = position.length - 2; i >= 0; i--) {
    const line = parseLine(position[i], stackCount);
    for (let j = 0; j < stackCount; j++) {
      if (line[j] !== " " && line[j] !== undefined) {
        stacks[j].push(line[j]);
      }
    }
  }
  return stacks;
};

const stacks = parseStacks(position.split("\n"));
// console.log(stacks);

const parseInstruction = (instruction: string) => {
  const [, count, , from, , to] = instruction
    .split(" ")
    .map((x) => parseInt(x));
  return [count, from, to];
};

const processInstructions = (stacks: string[][], instructions: string[]) => {
  for (let i = 0; i < instructions.length; i++) {
    const [count, from, to] = parseInstruction(instructions[i]);
    const fromStack = stacks[from - 1];
    stacks[to - 1] = stacks[to - 1].concat(
      fromStack.slice(fromStack.length - count)
    );
    stacks[from - 1] = fromStack.slice(0, fromStack.length - count);
    // console.log(stacks);
  }
  return stacks;
};

const processedStacks = processInstructions(stacks, instructions.split("\n"));
// console.log(processedStacks);

const result = processedStacks
  .map((stack) => stack.slice(stack.length - 1))
  .join("");

console.log(result);
// HRFTQVWNN
