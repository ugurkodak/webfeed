let database = require("./database");

//--- To be removed ---

let newYouTubeVideo =
    {
	title: "Meaning of Life"
    };
//database.post.add(newYouTubeVideo);

database.post.read(function(result)
    {
	console.log(result);
    });

//--- To be removed ---

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
