const fs = require("fs");
const path = require("path");

const createFile = (filePath) => {
  const todo = path.join(filePath, "todo.txt")
  const done = path.join(filePath, "done.txt")
  if (!fs.existsSync(todo)) {
    let createStreamTodo = fs.createWriteStream(todo);
    createStreamTodo.end();
  }

  if (!fs.existsSync(done)) {
    let createStreamDone = fs.createWriteStream(done);
    createStreamDone.end();
  }
};

module.exports = { createFile } // Path: todolist/src/utils/createFile.js
