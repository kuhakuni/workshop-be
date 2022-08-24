const todos = [];

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const {
	responseCreated,
	responseUpdated,
	responseDeleted,
	responseNotFound,
	responseGetData,
} = require("./response");

const app = express();
const PORT = process.env.port || 5000;

const cors = require('cors')

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use(cors({
	origin: [
		"*",
	],
	credentials: true,
	methods: "GET,POST,DELETE,PUT,PATCH",
	crossDomain: true,
	allowedHeaders: [
		"Content-Type",
		"Authorization",
		"Accept",
		"Origin",
		"X-Requested-With",
		"X-HTTP-Method-Override",
	],
	preflightContinue: false,
	optionsSuccessStatus: 204,
}))



// TODO 1 : GET ALL TODOS
app.get("/todos", (_req, res) => {
	responseGetData(res, todos);
});

// TODO 2 : GET TODO BY ID
app.get("/todos/:id", (req, res) => {
	const todo = todos.find((u) => u.id == req.params.id);
	if (!todo) return responseNotFound(res);
	responseGetData(res, todo);
});

// TODO 3 : ADD TODO
app.post("/todos", (req, res) => {
	const todo = {
		id: todos.length,
		todo: req.body.todo,
	};
	todos.push(todo);
	responseCreated(res);
});

// TODO 4 : EDIT TODO BY ID
app.put("/todos/:id", (req, res) => {
	const todo = todos.find((u) => u.id == req.params.id);
	if (!todo) return responseNotFound(res);
	todo.todo = req.body.todo;
	responseUpdated(res);
});

// TODO 5 : DELETE TODO BY ID
app.delete("/todos/:id", (req, res) => {
	const todo = todos.find((u) => u.id == req.params.id);
	if (!todo) return responseNotFound(res);
	todos.splice(todos.indexOf(todo), 1);
	responseDeleted(res);
});

// TODO 6 : DELETE ALL TODOS
app.delete("/todos", (_req, res) => {
	todos.splice(0, todos.length);
	responseDeleted(res);
});

app.get("*", (_req, res) => {
	res.sendStatus(404);
});

app.listen(PORT, (error) => {
	if (error) throw error;
	console.log(`Server berjalan pada port ${PORT}`);
});
