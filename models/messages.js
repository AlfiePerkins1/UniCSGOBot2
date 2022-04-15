const mongoose = require("mongoose");

const msgSchema = mongoose.Schema({
serverN: String,
serverID: Number,
prefix: String,



})

module.exports = mongoose.model("sConfig", sConfigSchema)