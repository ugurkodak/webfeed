/* let contentSchema = mongoose.Schema(
 *     {
 * 	apiReturn:
 *     });*/

let database = require("./database");

//Create an animal in database
let testAnimal = new database.animal.document(
    {
    	type: "Dog",
    	age: "12"
    });
testAnimal.save(function(error)
    {
    	if(!error)
    	    {
 		console.log("testAnimal is added to database.");
    	    };
    });

//Print all animal documents
/* let query = animal.find({});
 * query.exec(function(error, result)
 *     {
 * 	console.log(result);
 *     });
 * */
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
