let express = require("express");
let server = express();
let port = process.env.PORT || 5000;

let database = require(__dirname + "/database");
let api = require(__dirname + "/api");

server.set("views", __dirname + "/views");
server.set("view engine", "ejs");
server.use(express.static(__dirname + "/static"));

/* Save three unique popular tweets from trending topics to the
 * posts collection in database*/
for (let i = 0; i < 10; i++)
    {
	api.twitter.getPopularTweet(i, function(tweet)
 	    {
		if(tweet)
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
		    }
 		
 	    });	
    }

    //Routes
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
				       title: "WebFeed - Home",
				       posts: posts
				   });
		    }
	    });
    });

server.get("/register", function(req, res)
    {
	res.render("register",
		  {
		      title: "WebFeed - Register"
		  });
    });

server.post("/register", function(req, res)
    {
	res.redirect("/");
    });

server.get("/login", function(req, res)
    {
	res.render("login",
		   {
		       title: "WebFeed - Login"
		   });
    });

server.post("/login", function(req, res)
    {
	res.redirect("/");
    });

server.get("/account", function(req, res)
    {
	res.render("account",
		   {
		       title: "WebFeed - Account"
		   });
    });

server.post("/account", function(req, res)
    {
	res.redirect("/account");
    });

server.listen(port, function()
    {
	console.log("Server is running.");
    });
