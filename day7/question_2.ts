import { exit } from "process";
import { sum } from "../reducer";
import { readLines } from "../fileUtils";
const lines = readLines("./day7/input.txt")!;

/**
 * memory: current dir
 * storage: Known file structure and size
 */
const Dir = "dir";
const File = "file";

type Maybe<T> = T | null;
type FileType = typeof Dir | typeof File;
type Node = {
  type: FileType;
  name: string;
  size: number;
  nodes: Node[];
  parent: Maybe<Node>;
};

const initNode: Node = {
  type: Dir,
  name: "",
  size: 0,
  nodes: [],
  parent: null,
};
const root: Node = {
  type: Dir,
  name: "/",
  size: 0,
  nodes: [],
  parent: null,
};

const printNode = (node: Node, indent = 2) => {
  console.log(
    `${" ".repeat(indent)}- ${node.name} (${node.type}, size=${node.size})`
  );
  if (node.type === Dir) {
    node.nodes.forEach((node) => printNode(node, indent + 2));
  }
};

const processLines = (lines: string[], initNode: Node) => {
  let currentNode: Node = initNode;
  let lsStarted = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const symbols = line.split(" ");
    if (symbols[0] === "$") {
      if (symbols[1] === "ls") {
        lsStarted = true;
        continue;
      } else if (symbols[1] === "cd") {
        if (currentNode.type === Dir) {
          const size = currentNode.nodes
            .map((node) => node.size)
            .reduce(sum, 0);
          currentNode.size = size;
          // if (isNaN(size)) {
          //   printNode(currentNode);
          // }
        }
        lsStarted = false;
        const path = symbols[2];
        if (path === "..") {
          currentNode = currentNode.parent!;
        } else {
          const existedNode = currentNode.nodes.find(
            (node) => node.name === path
          );
          if (path === "/") {
            currentNode = root;
          } else if (existedNode) {
            currentNode = existedNode;
          } else {
            const node: Node = {
              type: Dir,
              name: path,
              size: 0,
              nodes: [],
              parent: currentNode,
            };
            currentNode.nodes.push(node);
            currentNode = node;
          }
        }
      }
    } else {
      if (lsStarted) {
        currentNode.nodes.push({
          type: symbols[0] === "dir" ? Dir : File,
          name: symbols[1],
          size: parseInt(symbols[0]),
          nodes: [],
          parent: currentNode,
        });
      } else {
        console.log(`error parse commands`);
        exit(1);
      }
    }
  }
  while (currentNode !== null) {
    const size = currentNode.nodes.map((node) => node.size).reduce(sum, 0);
    currentNode.size = size;
    // if (isNaN(size)) {
    //   printNode(currentNode);
    // }
    currentNode = currentNode.parent!;
  }
};
processLines(lines, initNode);
printNode(root);

type ReducerFunction<R> = (previousValue: R, currentValue: R) => R;

const walk = (
  initNode: Node,
  initValue: number,
  predicate: (node: Node) => boolean,
  reducer: ReducerFunction<number>
): number => {
  let current = initValue;
  let currentNode = initNode;
  if (predicate(currentNode)) {
    // console.log(currentNode.size, current, reducer(currentNode.size, current));
    current = reducer(currentNode.size, current);
  } else {
    return initValue;
  }
  current = currentNode.nodes
    .map((node) => walk(node, initValue, predicate, reducer))
    .reduce(reducer, current);
  // console.log(`path: ${currentNode.name}, current: ${current}`);
  return current;
};

// const result = walk(root, smallDirPredicate, fileSizeReducer);
// console.log(result);

// -------------------

const outmostSize = root.size;
const targetSize = 30000000;
const totalSize = 70000000;
const requiredSize = outmostSize - (totalSize - targetSize);
console.log(`outmostSize`, outmostSize);
console.log(`requiredSize`, requiredSize);

const largeDirPredicate = (node: Node) =>
  node.type === Dir && node.size >= requiredSize;
const minReducer: ReducerFunction<number> = (acc, cur) => Math.min(acc, cur);
const result = walk(root, totalSize, largeDirPredicate, minReducer);
console.log(result);
// 942298
