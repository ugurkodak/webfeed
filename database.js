let mongoose = require("mongoose");
let URI = "mongodb://webfeed_admin:12345@ds161059.mlab.com:61059/webfeed"
mongoose.Promise = global.Promise; //Remove Promise library depreciation warning (Temporary)
mongoose.connect(URI, function(error)
    {
	if(!error)
	    {
		console.log("Connected to webfeed database.");
	    }
    });
//let connection = mongoose.connection;

//POST (Videos, Tweets, etc.)
let postSchema = mongoose.Schema(
    {
	apiObject: {},
	date: {type: Date, default: Date.now}, //Date added to webfeed
	removed: {type: Boolean, default: false} //Is post removed?
    });
let postModel = mongoose.model("post", postSchema);  
let post =
    {
	create: function(apiObject, result = {})
	{
	    let document = new postModel(
		{
		    apiObject: apiObject 
		});
	    document.save(function(error, ret)
		{
		    if(error)
			{
			    console.log(error);
			}
		    else
			{
			    result(ret);
			}
		});
	},
	//TODO: Implement passing id or date to filter.
	read: function(result)
	{
	    postModel.find(function(error, ret)
		{
		    if(error)
			{
			    console.log(error);
			}
		    else
			{
			    result(ret);
			}
		});
	},
	delete: function(id, result)
	{
	    postModel.findById(id, function(error, ret)
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
					    result(ret);
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
