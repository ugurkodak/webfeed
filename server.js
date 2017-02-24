let database = require("./database");

//Add a new post -- To be removed --
let newYouTubeVideo =
    {
	title: "Meaning of Life"
    };
//database.post.add(newYouTubeVideo);

let allPosts = database.post.getAll(); // --- To be removed ---
console.log(allPosts);

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
