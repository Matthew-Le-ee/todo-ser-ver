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

app.get("/post", async (req, res) => {
	try{
		let data = await List.find();
		res.status(200).json(data);
	} catch(err) {
		res.status(500).json(err)
	}
	 
});

app.post("/post", async (req, res) => {
	const data = req.body;
	try{
		await List.create(data);
		res.status(200).json(data);
	} catch(err){
		res.status(500).json(err);
	}
		
});

app.put("/post/:id", async (req, res) => {
	const id = req.params.id;
	const newText = req.body;
	try{
		await List.findByIdAndUpdate(id, newText);
		res.status(200).json(newText);
	} catch(err){
		res.status(500).json(err);
	}
});

app.delete("/post/:id", async (req, res) => {
	const id = req.params.id;
	try{
		await List.findByIdAndDelete(id);
		res.status(200).json({"message":"data successfully Deleted"})
	}catch(err){
		res.status(500).json(err);
	}
});
