let express = require("express");
let server = express();
let port = process.env.PORT || 5000;

let database = require("./database");
let api = require("./api");

//Testing twitter
//Get one popular tweet from first and second trending.
let popularTweets = [];
for (let i = 0; i < 2; i++)
    {
	api.twitter.getPopularTweet(i, function(tweet)
	    {
		popularTweets[i] = tweet.text
	    });	
    }


server.get("/", function(req, res)
    {
	res.send(popularTweets[0] + "\n" + popularTweets[1]);
    });

server.listen(port, function()
    {
	console.log("Server is running.");
    });
