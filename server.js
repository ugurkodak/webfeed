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

//from my branch
