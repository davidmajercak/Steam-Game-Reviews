var express		 = require("express"),
	app			 = express(),
	bodyParser	 = require("body-parser"),
	mongoose 	 = require("mongoose"),
	Game 		 = require("./models/game"),
	seedDB		 = require("./seeds");

seedDB();

//fix MongoDB depreciation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://127.0.0.1:27017/Steam-Game-Reviews");
//Go to http://127.0.0.1:3000/ when running locally (port 3000 is used for testing express apps)

//Add this to serve the public folder for CSS
app.use(express.static("public"));

//tell express to use body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));

//Add this to make .ejs files the default (can leave off the .ejs)
app.set("view engine", "ejs");

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
	});
});

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
	Game.findById(req.params.id).populate("comments").exec(function(err, foundGame){
		if(err) {
			console.log(err);
		} else {
			console.log(foundGame);
			//render show template with that game
			res.render("show", {game: foundGame});
		}
	});
});


app.listen(3000, function() {
	console.log("Server is now listening on port 3000");
});