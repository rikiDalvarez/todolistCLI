const { logAppCommands } = require('./utils/commands.js');
const path = require("path");
const fs = require("fs");
const { createFile } = require('./utils/createFile.js');
const args = process.argv;
const todoFilePath = path.join(__dirname, 'todo.txt');
createFile(todoFilePath);

const addTodo = (todo) => {
	let timeStamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
	let todoToAdd = todo + " " + timeStamp;
	fs.appendFileSync(todoFilePath, todoToAdd + '\n');
	console.log('Added todo: "' + todo + '"');
}

const deleteTodo = (todo) => {
	let todos = fs.readFileSync(todoFilePath, 'utf8').split('\n');
	let todoToDelete = todos[todo - 1];
	todos.splice(todo - 1, 1);
	fs.writeFileSync(todoFilePath, todos.join('\n'));
	console.log('Deleted todo: "' + todoToDelete + '"');
}

const listTodos = () => {
	let todos = fs.readFileSync(todoFilePath, 'utf8').split('\n');
	todos.forEach((todo, index) => {
		if (todo !== '') {
			console.log(index + 1 + ' - ' + todo);
		}
	});
}

const markTodoDone = (todo) => {
	let todos = fs.readFileSync(todoFilePath, 'utf8').split('\n');
	let todoToMark = todos[todo - 1];
	todos.splice(todo - 1, 1);
	fs.writeFileSync(todoFilePath, todos.join('\n'));
	fs.appendFileSync('done.txt', todoToMark + '\n');
	console.log('Marked todo: "' + todoToMark + '" as done');
}

const report = () => {
	let todos = fs.readFileSync(todoFilePath, 'utf8').split('\n');
	let doneTodos = fs.readFileSync('done.txt', 'utf8').split('\n');
	let timeStamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
	console.log(timeStamp + ' Pending : ' + todos.length + ' Completed : ' + doneTodos.length);
}

const dropAllTodos = () => {
	fs.writeFileSync(todoFilePath, "");
	console.log('All todos deleted');
}

const todoHandler = (args) => {
	switch (args[2]) {
		case "add":
			addTodo(args[3]);
			break;
		case "delete":
			deleteTodo(args[3]);
			break;
		case "help":
			logAppCommands();
			break;
		case "ls":
			listTodos();
			break;
		case "done":
			markTodoDone(args[3]);
			break;
		case "report":
			report();
			break;
		case "drop":
			dropAllTodos();
			break;
		default:
			console.log("Please enter a valid command");
			logAppCommands();
	}
}

todoHandler(args);

