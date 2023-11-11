import fs from "fs";
import * as path from 'path';

export const readLines = (fileName: string, splitter = /\r?\n/): string[] => {
  try {
    const absolutePath = path.resolve(__dirname, fileName);
    const data = fs.readFileSync(absolutePath, "utf-8");
    const lines = data.split(splitter);
    return lines;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const readData = (fileName: string) => {
  try {
    return fs.readFileSync(fileName, "utf-8");
  } catch (err) {
    console.error(err);
  }
};

export const appendToFile = (fileName: string, data: string) => {
  try {
    const absolutePath = path.resolve(__dirname, fileName);
    fs.appendFileSync(absolutePath, data);
  } catch (err) {
    console.error(err);
  }
}
