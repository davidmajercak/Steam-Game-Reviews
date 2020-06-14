var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//Add this to serve the public folder for CSS
app.use(express.static("public"));

//tell express to use body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));


//Add this to make .ejs files the default (can leave off the .ejs)
app.set("view engine", "ejs");


//Currently storing games in an array, will be using MongoDB soon
var games = [
	{name: "Monster Train", image: "https://steamcdn-a.akamaihd.net/steam/apps/1102190/header.jpg?t=1590084588"},
	{name: "Hades", image: "https://steamcdn-a.akamaihd.net/steam/apps/1145360/capsule_616x353_alt_assets_2.jpg?t=1588870028"},
	{name: "Gunfire Reborn", image: "https://steamcdn-a.akamaihd.net/steam/apps/1217060/header.jpg?t=1591153495"},
	{name: "Monster Train", image: "https://steamcdn-a.akamaihd.net/steam/apps/1102190/header.jpg?t=1590084588"},
	{name: "Hades", image: "https://steamcdn-a.akamaihd.net/steam/apps/1145360/capsule_616x353_alt_assets_2.jpg?t=1588870028"},
	{name: "Gunfire Reborn", image: "https://steamcdn-a.akamaihd.net/steam/apps/1217060/header.jpg?t=1591153495"},
	{name: "Monster Train", image: "https://steamcdn-a.akamaihd.net/steam/apps/1102190/header.jpg?t=1590084588"},
	{name: "Hades", image: "https://steamcdn-a.akamaihd.net/steam/apps/1145360/capsule_616x353_alt_assets_2.jpg?t=1588870028"},
	{name: "Gunfire Reborn", image: "https://steamcdn-a.akamaihd.net/steam/apps/1217060/header.jpg?t=1591153495"}
]


app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/games", function(req, res) {
	res.render("games", {games:games});
})

//post request should be named the same as the get request (REST)
app.post("/games", function(req, res) {
	//get data from form and send to games array
	var name = req.body.name;
	var image = req.body.image;
	var newGame = {
		name: name,
		image: image
	}
	games.push(newGame);
	//redirect back to /games (default is to get request)
	res.redirect("/games");
});

//Form that sends data to the post route
app.get("/games/new", function(req, res) {
	res.render("new");
});


app.listen(3000, function() {
	console.log("Server is now listening on port 3000");
});