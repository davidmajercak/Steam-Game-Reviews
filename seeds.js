var mongoose = require("mongoose");
var Game = require("./models/game");
var Comment = require("./models/comment");

var data = [
    {
        name: "Rocket League",
        image: "https://steamcdn-a.akamaihd.net/steam/apps/252950/capsule_616x353.jpg?t=1595351532",
        description: "Soccer with Cars!"
    },
    {
        name: "Realm of the Mad God",
        image: "https://steamcdn-a.akamaihd.net/steam/apps/200210/header.jpg?t=1572621503",
        description: "Team up with dozens of players and battle through the Realm of the Mad God, Oryx."
    },
    {
        name: "Gunfire Reborn",
        image: "https://steamcdn-a.akamaihd.net/steam/apps/1217060/capsule_616x353.jpg?t=1594625582",
        description: "Gunfire Reborn is an adventure level-based game featured with FPS, Roguelite and RPG."
    }
]

function seedDB() {
    //Remove all previously existing games
    Game.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed games!");
        Comment.remove({}, function (err) {
            if (err) {
                console.log(err);
            }
            console.log("removed comments!");
            //Add seeded comments to each game in the DB
            data.forEach(function(seed) {
                Game.create(seed, function (err, game) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("added a game");
                        Comment.create(
                            {
                                text: "This game is pretty OK.",
                                author: "OKGuy"
                            }, function (err, comment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    for(var i = 0; i < 5; i++) {
                                        game.comments.push(comment);
                                    }
                                    game.save();
                                    console.log("Created new comments");
                                }
                            });
                    }
                });
            });
        });
    });
}

module.exports = seedDB;