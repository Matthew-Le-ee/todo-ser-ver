import express from "express";
import Cors from "cors";
import mongoose from "mongoose";
import List from "./Database.js";
import "dotenv/config";

const app = express();

const connection = process.env.CONNECTION_KEY;
mongoose
	.connect(connection)
	.then(() => console.log("connected!"))
	.catch((err) => console.error("Connection error", err));

const port = process.env.PORT || 8080;
app.use(express.json());
app.use(Cors());

app.listen(port, () => console.log(`Listening on localhost ${port}`));

app.get("/", (req, res) => {
	res.status(200).send("Hello ExpressJs");
});

app.get("/post", (req, res) => {
	List.find((err, data) => {
		if (err) {
			return res.status(500).send(err);
		}
		res.status(200).send(data);
	});
});

app.post("/post", (req, res) => {
	const data = req.body;
	List.create(data, (err, data) => {
		if (err) {
			return res.status(500).send(err);
		}
		res.status(201).send(data);
	});
});

app.put("/post/:id", (req, res) => {
	const id = req.params.id;
	const newText = req.body;
	List.findByIdAndUpdate(id, newText, { new: true }, (err, data) => {
		if (err) {
			return res.status(500).send(err);
		}
		res.status(200).send(data);
	});
});

app.delete("/post/:id", (req, res) => {
	const id = req.params.id;
	List.findByIdAndDelete(id, (err, data) => {
		if (err) {
			return res.status(500).send(err);
		}
		res.status(200).send(data);
	});
});
