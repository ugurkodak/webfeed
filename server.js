let database = require("./database");

//(CRUD TEST) For this test we need to nest our CRUD calls to ensure they are called sequentially and to work with the same object.
let newYouTubeVideo =
    {
	title: "Meaning of Life"
    };
database.post.create(newYouTubeVideo, function(resultCreate)
    {
	console.log("Post created. ID: " + resultCreate._id);
	database.post.read(function(resultRead)
	    {
		for(let i = 0; i < resultRead.length; i++)
		    {
			console.log("Post read. ID: " + resultRead[i]._id);	
		    }
		database.post.delete(resultCreate._id, function(resultDelete)
		    {
			console.log("Post deleted. ID: " + resultDelete._id);
		    });
	    });
    });

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
