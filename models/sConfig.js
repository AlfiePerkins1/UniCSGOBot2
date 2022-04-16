const mongoose = require("mongoose");

const sConfigSchema = mongoose.Schema({
	serverN: String,
	serverID: Number,
	prefix: String,
	commands: Array


});

module.exports = mongoose.model("sConfig", sConfigSchema);