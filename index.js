const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const todos = [];
const PORT = process.env.port || 5000;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

// TODO 1 : GET ALL TODOS
app.get("/api/todos", (req, res) => {
	res.status(200).json({
		success: true,
		data: {
			...todos,
		},
	});
});

// TODO 2 : GET TODO BY ID
app.get("/api/todos/:id", (req, res) => {
	const todo = todos.find((u) => u.id == req.params.id);
	if (!todo)
		return res.status(404).json({
			success: false,
			message: "Data not found",
		});
	res.status(200).json({
		success: true,
		data: {
			todo,
		},
	});
});

// TODO 3 : ADD TODO
app.post("/api/todos", (req, res) => {
	const todo = {
		id: todos.length,
		todo: req.body.todo,
	};
	todos.push(todo);
	res.status(201).send({
		status: "success",
		message: "Data berhasil ditambahkan",
	});
});

// TODO 4 : EDIT TODO BY ID
app.put("/api/todos/:id", (req, res) => {
	const todo = todos.find((u) => u.id == req.params.id);
	if (!todo)
		return res.status(404).json({
			success: false,
			message: "Data not found",
		});
	todo.todo = req.body.todo;
	res.status(200).send({
		status: "success",
		message: "Data berhasil diubah",
	});
});

// TODO 5 : DELETE TODO BY ID
app.delete("/api/todos/:id", (req, res) => {
	const todo = todos.find((u) => u.id == req.params.id);
	if (!todo)
		return res.status(404).json({
			success: false,
			message: "Data not found",
		});
	todos.splice(todos.indexOf(todo), 1);
	res.status(200).send({
		status: "success",
		message: "Data berhasil dihapus",
	});
});

app.get("*", (req, res) => {
	res.sendStatus(404);
});

app.listen(PORT, (error) => {
	if (error) throw error;
	console.log(`Server berjalan pada port ${PORT}`);
});
