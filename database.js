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
	create: function(apiObject)
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
			    console.log("Post with id " + document._id + " created.");
			}
		});
	},
	//TODO: Implement passing id or date to filter.
	read: function(result, id = null, date = null)
	{
	    postModel.find(function(error, ret)
		{
		    if(error)
			{
			    console.log(error);
			}
		    else
			{
			    for (let i = 0; i < ret.length; i++)
				{
				    console.log("Post with id " + ret[i]._id + " read.");
				}
			    result(ret);
			}
		});
	},
	delete: function(id)
	{
	    postModel.findByID(id, function(error, found)
		{
		    if(error)
			{
			    console.log(error);
			}
		    else
			{
			    postModel.remove({_id: id}, function(error)
				{
				    if(error)
					{
					    console.log(error);
					}
				    else
					{
					    console.log("Post with id " + id + " removed.");
					}
				});
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
