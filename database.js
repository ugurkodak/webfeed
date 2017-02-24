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

//ANIMAL
let animalSchema = mongoose.Schema(
    {
	type: "string",
	age: "string"	
    });
let animalModel = mongoose.model("animal", animalSchema);
let animal =
    {
	document: animalModel
    };

//Store models in database object for exporting
let database =
    {
	animal: animal
    };

module.exports = database;
