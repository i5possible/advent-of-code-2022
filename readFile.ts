import fs from "fs";

export const readLines = (fileName: string, splitter = /\r?\n/): string[] => {
  try {
    const data = fs.readFileSync(fileName, "utf-8");
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
