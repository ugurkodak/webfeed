let express = require("express");
let server = express();
let port = process.env.PORT || 5000;

let bodyParser = require('body-parser');

let session = require('express-session');
let passport = require('passport');
let passportlocal = require('passport-local');
let localStrategy = passportlocal.Strategy;

let favicon = require("serve-favicon");

let database = require(__dirname + "/database");
let api = require(__dirname + "/api");

server.set("views", __dirname + "/views");
server.set("view engine", "ejs");
server.use(express.static(__dirname + "/public"));
server.use(favicon(__dirname + "/public/favicon.ico"));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use(session({
    secret: "SomeSecret",
    saveUninitialized: true,
    resave: true
}));
server.use(passport.initialize());
server.use(passport.session());
passport.use(database.user.createStrategy());
passport.serializeUser(database.user.serializeUser());
passport.deserializeUser(database.user.deserializeUser());

/* Save up to 10 unique popular tweets from trending topics to the
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
    						database.post.create({apiObject: tweet, source: "twitter"}, function(error, post)
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


//Save 10 trending videos from youtube
api.youtube.getPopular("5", function(result)
    {
	if(result.items.length > 0)
	    {
		for (let i = 0; i < result.items.length; i++)
		    {
			database.post.find({"apiObject.id": result.items[i].id}).exec(function(error, post)
			    {
				if (error)
				    {
					console.log(error);
				    }
				else
				    {
					if(post[0])
					    {
						console.log("YouTube video already exist. ID: " + post[0].apiObject.id);
					    }
					else
					    {
						database.post.create({apiObject: result.items[i], source: "youtube"}, function(error, post)
						    {
							if (error)
							    {
								console.log(error);
							    }
							else
							    {
						       		console.log("New YouTube video added. ID: " + post.apiObject.id);
							    }
						    });
					    }
				    }
			    });
		    }
	    }
    });

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
				       posts: posts,
				       username: req.user ? req.user.username: ""
				   });
		    }
	    });
    });

server.get("/signup", function(req, res)
    {
	res.render("signup",
		   {
		       title: "WebFeed - Sign Up"
		   });
    });

server.post("/signup", function(req, res)
    {
	database.user.register(
	    new database.user(
		{
		    email: req.body.email,
		    username: req.body.username,
		    name: req.body.name,
		}), req.body.password,
	    function(error)
	    {
		if(error)
		    {
			console.log(error);
			return res.render("signup",
					  {
					      title: "WebFeed - Sign Up"
					  });	
		    }
		else
		    {
			return passport.authenticate("local")(req, res, function()
			    {
				res.redirect("/");
			    });
		    }
	    }
	);
    });

server.get("/login", function(req, res)
    {
	res.render("login",
		   {
		       title: "WebFeed - Login"
		   });
    });

server.post("/login", passport.authenticate("local",
					    {
						successRedirect: "/",
						failureRedirect: "/login"
					    }));

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

server.get("/logout", function(req, res)
    {
	req.logout();
	res.redirect('/');
    });

server.listen(port, function()
    {
	console.log("Server is running.");
    });
