import { readData } from '../fileUtils';

const data = readData('./day11/input.txt');

const monkeysData = data.split('\n\n');

type Monkey = {
  id: number;
  items: number[];
  operation: string;
  test: {
    divisible: number;
    success: number;
    failure: number;
  };
};

const parseMonkey = (monkeyData: string): Monkey => {
  const lines = monkeyData.split('\n');
  const id = parseInt(lines[0].split(/[ :]/)[1]);
  // console.log(`id: ${id}`);
  const items = lines[1]
    .split(':')[1]
    .split(', ')
    .map((item) => parseInt(item));
  // console.log(`items: ${items}`);
  const operation = lines[2].split(':')[1].trim();
  // console.log(`operation: ${operation}`);
  const test = {
    divisible: parseInt(lines[3].split(' ').slice(-1)[0]),
    success: parseInt(lines[4].split(' ').slice(-1)[0]),
    failure: parseInt(lines[5].split(' ').slice(-1)[0]),
  };
  // console.log(`test: ${JSON.stringify(test)}`);
  return {
    id,
    items,
    operation,
    test,
  };
};

// parseMonkey(monkeysData[0]);

const executeOperation = (operation: string, item: number): number => {
  const replaced = operation.split('=')[1].replace(/old/g, item.toString());
  // console.log(`replaced: ${replaced}`);
  return eval(replaced);
};

// const add = executeOperation('new = old + 1', 10);
// const sub = executeOperation('new = old - 1', 10);
// const mul = executeOperation('new = old * 2', 10);
// const div = executeOperation('new = Math.floor(old / 2)', 10);
// const sqr = executeOperation('new = old * old', 10);
// console.log(`add: ${add}`);
// console.log(`sub: ${sub}`);
// console.log(`mul: ${mul}`);
// console.log(`div: ${div}`);
// console.log(`sqr: ${sqr}`);

const printMonkeys = (monkeys: Monkey[]) => {
  console.log('----------------');
  for (const monkey of monkeys) {
    console.log(`id: ${monkey.id}`);
    console.log(`items: ${monkey.items}`);
  }
  console.log('');
};

type InspectMap = {
  [key: number]: number;
};
const processRounds = (monkeys: Monkey[], rounds: number): InspectMap => {
  const inspectMap: InspectMap = {};
  for (let i = 0; i < rounds; i++) {
    // console.log(`Round ${i}`);
    // printMonkeys(monkeys);
    for (const monkey of monkeys) {
      inspectMap[monkey.id] =
        (inspectMap[monkey.id] || 0) + monkey.items.length;
      let item = monkey.items.shift();
      while (item) {
        const worryLevel = executeOperation(monkey.operation, item);
        const currentWorryLevel = Math.floor(worryLevel / 3);
        if (currentWorryLevel % monkey.test.divisible === 0) {
          monkeys[monkey.test.success].items.push(currentWorryLevel);
        } else {
          monkeys[monkey.test.failure].items.push(currentWorryLevel);
        }
        item = monkey.items.shift();
      }
    }
  }
  return inspectMap;
};

const inspectMap = processRounds(monkeysData.map(parseMonkey), 20);
// console.log(`inspectMap: ${JSON.stringify(inspectMap)}`);
const calculateMonkeyBusinessLevel = (inspectMap: InspectMap): number => {
  // find top 2 and multiply
  const sorted = Object.entries(inspectMap).sort((a, b) => b[1] - a[1]);
  return sorted[0][1] * sorted[1][1];
};
const monkeyBusinessLevel = calculateMonkeyBusinessLevel(inspectMap);
// 54752
console.log(`monkeyBusinessLevel: ${monkeyBusinessLevel}`);
