const { timeStamp } = require("console");
const fs = require("fs");
const path = require("path");

const args = process.argv;

const todoFilePath = path.join(__dirname, 'todo.txt');

if (!fs.existsSync(todoFilePath)) {
	let createStream = fs.createWriteStream(todoFilePath);
	createStream.end();
}

if (!fs.existsSync(todoFilePath)) {
	let createStream = fs.createWriteStream('done.txt');
	createStream.end();
}

const appCommands = () => {
	const text = `
	 - add = add new todo
	 - ls = list all todos
	 - del = delete a todo
	 - done = mark a todo as done
	 - help = show all commands
	 - report = show report
	 `
	console.log(text)
}

appCommands();

const addTodo = (todo) => {
	let timeStamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
	let todoToAdd = timeStamp + ' ' + todo + []
	fs.appendFileSync(todoFilePath, todoToAdd + '\n');
	console.log('Added todo: "' + todo + '"');
}


if (args[2] === "add") {
	addTodo(args[3])
}
