let express = require("express");
let server = express();
let port = process.env.PORT || 5000;

let database = require(__dirname + "/database");
let api = require(__dirname + "/api");

server.use(express.static(__dirname + "/static"));
server.set("views", __dirname + "/views");
server.set("view engine", "ejs");


/* Save three unique popular tweets from trending topics to the
 * posts collection in database*/
for (let i = 0; i < 3; i++)
    {
	api.twitter.getPopularTweet(i, function(tweet)
	    {
		database.post.find({"apiObject.id": tweet.id}).exec(function(error, post)
		    {
			if (error)
			    {
				console.log(error);
			    }
			else
			    {
				if(post[0])
				    {
					console.log("Tweet already exist. ID: " + post[0].apiObject.id);
				    }
				else
				    {
					database.post.create({apiObject: tweet}, function(error, post)
					    {
						if (error)
						    {
							console.log(error);
						    }
						else
						    {
							console.log("New tweet added. ID: " + post.apiObject.id);
						    }
					    });
				    }
			    }
		    });
	    });	
    }

server.get("/", function(req, res)
    {
	database.post.find(function(error, posts)
	    {
		if(error)
		    {
			console.log(error);
		    }
		else
		    {
			res.render("home",
				   {
				       title: "WebFeed",
				       posts: posts
				   });
		    }
	    });
    });

server.listen(port, function()
    {
	console.log("Server is running.");
    });
