//Server
let express = require("express");
let server = express();
let port = process.env.PORT || 5000;

server.get("/", function(req, res)
    {
	res.send("COMP313");
    });

server.listen(port, function()
    {
	console.log("Server is running.");
    });

//Database connection
let mongoose = require("mongoose");
let URI = "mongodb://webfeed_admin:12345@ds161059.mlab.com:61059/webfeed"

mongoose.connect(URI, function(error)
    {
	if(error)
	    {
		console.log("Error connectiong to database.");
	    }
	else
	    {
		console.log("Connected to MongoDB");
	    }
    });
