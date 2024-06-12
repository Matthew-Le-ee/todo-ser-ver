import express from "express";
import Cors from "cors";
import mongoose from "mongoose";
import List from "../Database.js";
import "dotenv/config";

const app = express();

const connection = process.env.CONNECTION_KEY;
mongoose.connect(connection, {useNewUrlParser:true}, () => console.log("connected!"));
mongoose.set('strictQuery', true);

const port = process.env.PORT || 8080;
app.use(express.json());
app.use(Cors());

app.listen(port, () => console.log(`Listening on localhost ${port}`));

app.get("/", (req, res) => {
	res.status(200).json({"message":"success"});
});

app.get("/post", (req, res) => {
	List.find((err, data) => {
		if (err) {
			res.status(500).json(err);
		} else {
			res.status(200).json(data);
		}
	});
})

app.post("/post",  (req, res) => {
	const data = req.body;
	List.create(data, (err, data) => {
		if (err) {
			res.status(500).json(err);
		} else {
		    res.status(201).json(data);
		}
	});
		
});

app.put("/post/:id",  (req, res) => {
	const id = req.params.id;
	const newText = req.body;
    List.findByIdAndUpdate(id, newText,  (err, data) => {
	    if (err) {
		   res.status(500).json(err);
	    } else {
	       res.status(200).json(data);
		}
    });
});

app.delete("/post/:id",  (req, res) => {
	const id = req.params.id;
	List.findByIdAndDelete(id, (data,err)=>{
		if(err) {
			res.status(500).json(err);
		} else {
		    res.status(201).json(data);
		}
	})

});
