var express		 = require("express"),
	app			 = express(),
	bodyParser	 = require("body-parser"),
	mongoose 	 = require("mongoose");


//fix MongoDB depreciation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/Steam-Game-Reviews");

//Add this to serve the public folder for CSS
app.use(express.static("public"));

//tell express to use body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));


//Add this to make .ejs files the default (can leave off the .ejs)
app.set("view engine", "ejs");

//Setup Mongoose Schema
var gameSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Game = mongoose.model("Game", gameSchema);

// Game.create({
// 				name: "Gunfire Reborn", 
// 				image: "https://steamcdn-a.akamaihd.net/steam/apps/1217060/header.jpg?t=1591153495",
// 				description: "An adventure level-based game featured with FPS, Roguelite and RPG."
// 			}, function(err, game) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(game + " successfully added to database")
// 	}
// })

app.get("/", function(req, res) {
	res.render("landing");
});

//Index - show all games
app.get("/games", function(req, res) {
	//get all games from DB
	Game.find({}, function(err, games) {
		if(err) {
			console.log(err);
		} else {
			res.render("index", {games:games});
		}
	})
})

//post request should be named the same as the get request (REST)
app.post("/games", function(req, res) {
	//get data from form and send to games array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newGame = {
		name: name,
		image: image,
		description: description
	}
	//Create a new Game and save to Database
	Game.create(newGame, function(err, newlyCreated){
		if(err) {
			console.log(err);
		} else {
			//redirect back to /games (default is to get request)
			res.redirect("/games");
		}
	});
});

//Form that sends data to the post route
app.get("/games/new", function(req, res) {
	res.render("new");
});

//Show - shows more information about one game
app.get("/games/:id", function(req, res) {
	//find the game with matching id
	Game.find({_id: req.params.id}, function(err, foundGame) {
		if(err) {
			console.log(err);
		} else {
			//render show template with that game
			res.render("show", {game: foundGame});
		}
	});
	
	
});


app.listen(3000, function() {
	console.log("Server is now listening on port 3000");
});