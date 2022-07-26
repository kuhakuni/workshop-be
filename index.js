const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const todos = [];
const PORT = process.env.port || 5000;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

const api = express.Router();

// TODO 1 : GET ALL TODOS
api.get("/todos", (_req, res) => {
	responseGetData(res, todos);
});

// TODO 2 : GET TODO BY ID
api.get("/todos/:id", (req, res) => {
	const todo = todos.find((u) => u.id == req.params.id);
	if (!todo)return responseNotFound(res);
	responseGetData(res, todo);
});

// TODO 3 : ADD TODO
api.post("/todos", (req, res) => {
	const todo = {
		id: todos.length,
		todo: req.body.todo,
	};
	todos.push(todo);
	responseCreated(res);
});

// TODO 4 : EDIT TODO BY ID
api.put("/todos/:id", (req, res) => {
	const todo = todos.find((u) => u.id == req.params.id);
	if (!todo)return responseNotFound(res);
	todo.todo = req.body.todo;
	responseUpdated(res);
});

// TODO 5 : DELETE TODO BY ID
api.delete("/todos/:id", (req, res) => {
	const todo = todos.find((u) => u.id == req.params.id);
	if (!todo)return responseNotFound(res);
	todos.splice(todos.indexOf(todo), 1);
	responseDeleted(res);
});

api.get("*", (_req, res) => {
	res.sendStatus(404);
});


app.use("/api", api);


const responseCreated = (res) => {
	res.status(201).send({
		is_success: true,
		message: "Data berhasil ditambahkan",
	});
}

const responseUpdated = (res) => {
	res.status(200).send({
		is_success: true,
		message: "Data berhasil diubah",
	});
}

const responseDeleted = (res) => {
	res.status(200).send({
		is_success: true,
		message: "Data berhasil dihapus",
	});
}

const responseNotFound = (res) => {
	res.status(404).send({
		is_success: false,
		message: "Data tidak ditemukan",
	});
}

const responseBadRequest = (res) => {
	res.status(400).send({
		is_success: false,
		message: "Data tidak valid",
	});
}

const responseGetData = (res, data) => {
	res.status(200).send({
		is_success: true,
		data : data,
	});
}


app.listen(PORT, (error) => {
	if (error) throw error;
	console.log(`Server berjalan pada port ${PORT}`);
});
