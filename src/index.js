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

const logAppCommands = () => {
	const text = `
	 - add = add new todo
	 - ls = list all todos
	 - del = delete a todo
	 - done = mark a todo as done
	 - help = show all commands
	 - report = show report
	 - drop = delete all todos
	 `
	console.log(text)
}

logAppCommands();

const addTodo = (todo) => {
	let timeStamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
	let todoToAdd = todo + " " + timeStamp + '\n';
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


if (args[2] === "add") {
	addTodo(args[3])
}
if (args[2] === "delete") {
	deleteTodo(args[3])
}
if (args[2] === "help") {
	logAppCommands()
}
if (args[2] === "ls") {
	listTodos()
}
if (args[2] === "done") {
	markTodoDone(args[3])
}
if (args[2] === "report") {
	report()
}
if (args[2] === "drop") {
	dropAllTodos()
}





