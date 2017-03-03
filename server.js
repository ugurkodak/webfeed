let express = require("express");
let server = express();
let port = process.env.PORT || 5000;

let database = require(__dirname + "/database");
let api = require(__dirname + "/api");

server.use(express.static(__dirname + "/static"));
server.set("views", __dirname + "/views");
server.set("view engine", "ejs");

//Testing twitter
//Get one popular tweet from 5 trending.
let posts = [];
for (let i = 0; i < 5; i++)
    {
	api.twitter.getPopularTweet(i, function(tweet)
	    {
		posts[i] = tweet.text
	    });	
    }

server.get("/", function(req, res)
    {
	res.render("home",
		   {
		       title: "WebFeed",
		       posts: posts
		   });
    });

server.listen(port, function()
    {
	console.log("Server is running.");
    });
