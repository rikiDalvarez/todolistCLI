const fs = require("fs");

const createFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    let createStream = fs.createWriteStream(filePath);
    createStream.end();
  }

  if (!fs.existsSync(filePath)) {
    let createStream = fs.createWriteStream("done.txt");
    createStream.end();
  }
};

module.exports = { createFile } // Path: todolist/src/utils/createFile.js
