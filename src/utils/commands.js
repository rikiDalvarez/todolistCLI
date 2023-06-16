const logAppCommands = () => {
	const text = `
	 - add = add new todo
	 - ls = list all todos
	 - delete = delete a todo
	 - done = mark a todo as done
	 - help = show all commands
	 - report = show report
	 - drop = delete all todos
	 `
	console.log(text)
}

module.exports = { logAppCommands }