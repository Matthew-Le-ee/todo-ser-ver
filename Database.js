import mongoose from "mongoose";

const schema = mongoose.Schema({
	text: String,
});

export default mongoose.model("list", schema);
