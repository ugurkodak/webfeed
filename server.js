let express = require("express");
let server = express();
let port = process.env.PORT || 5000;

let database = require("./database");
let api = require("./api");



server.get("/", function(req, res)
    {
	//Testing twitter
	api.twitter.getTrending(function(trends)
	    {
		res.send(trends);
	    });
    });

server.listen(port, function()
    {
	console.log("Server is running.");
    });
