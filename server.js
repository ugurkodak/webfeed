//Database connection
let mongoose = require("mongoose");
let URI = "mongodb://webfeed_admin:12345@ds161059.mlab.com:61059/webfeed"
mongoose.Promise = global.Promise; //Remove Promise library depreciation warning (Temporary)
mongoose.connect(URI, function(error)
    {
	if(error)
	    {
		console.log("Connected to webfeed database");
	    }
    });
let database = mongoose.connection;

// animal model (animals collection) for testing CRUD aoperations -------------Temporary---------------
let animalSchema = mongoose.Schema(
    {
	type: "string",
	age: "string"
	
    });
let animal = mongoose.model("animal", animalSchema);

//Create
/* let testAnimal = new animal(
 *     {
 *    	type: "Dog",
 *    	age: "12"
 *     });
 * testAnimal.save(function(error)
 *     {
 *    	if(!error)
 *    	    {
 * 		console.log("testAnimal is added to database.");
 *    	    };
 *     });*/

//Print all animal documents
let query = animal.find({});
query.exec(function(error, result)
    {
	console.log(result);
    });
//------------------------------------------------------------------Temporary------------------------

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
