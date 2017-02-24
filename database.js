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
//let connection = mongoose.connection;

//POST (Videos, Tweets, etc.)
let postSchema = mongoose.Schema(
    {
	date: {type: Date, default: Date.now},
	apiObject: {}
    });
let postModel = mongoose.model("post", postSchema);  
let post =
    {
	add: function(apiObject)
	{
	    let document = new postModel(
		{
		    apiObject: apiObject 
		});
	    document.save(function(error)
		{
		    if(error)
			{
			    console.log(error);
			}
		    else
			{
			    console.log("Post successfully added.");
			}
		});
	},
	getAll: function() // --- To be removed ---
	{
	    postModel.find(function(error, posts)
		{
		    if(error)
			{
			    console.log(error);
			}
		    else
			{
			    return posts;
			}
		});
	}
    };

//Store models in database object for exporting
let database =
    {
	post: post,
    };

module.exports = database;
