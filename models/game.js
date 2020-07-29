var mongoose = require("mongoose");

var gameSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

module.exports = mongoose.model("Game", gameSchema);