let mongoose = require("mongoose");
let URI = "mongodb://webfeed_admin:12345@ds161059.mlab.com:61059/webfeed"
//mongoose.Promise = global.Promise; //Remove Promise library depreciation warning (Temporary)
mongoose.connect(URI, function(error)
    {
	if(!error)
	    {
		console.log("Connected to webfeed database.");
	    }
    });

//POSTS (Videos, Tweets, etc.)
let postSchema = mongoose.Schema(
    {
	apiObject: {},
	date: {type: Date, default: Date.now}, //Date added to webfeed 
	removed: {type: Boolean, default: false} //Is post removed?
    });
let post = mongoose.model("post", postSchema);

//USERS
let userSchema = mongoose.Schema(
    {
	email: String,
	password: String,
	date: {type: Date, default: Date.now},
	filters:
		[{
		    timeRange: Number,
		    region: String,
		    youtube: {type: Boolean, default: true},
		    twitter: {type: Boolean, default: true}
		}]
    });
let user = mongoose.model("user", userSchema);

//Store models in database object for exporting
let database =
    {
	post: post,
	user: user
    };

module.exports = database;
