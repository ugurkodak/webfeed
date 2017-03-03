//TWITTER
let twitter = require("twitter");
var twitterClient = new twitter(
    {
	consumer_key: "a6K1B1gT2ImeXKHJOw0voPGox",
	consumer_secret: "psA4hodgf7h9Y0OrpssO8t1c1pVm0p4lFeXuj5mNuPpxM49cvF",
	access_token_key: "122784300-wSnL7h757J9zig7wgOZeJya0I0G1yhDjub3T4N8v",
	access_token_secret: "xNeNNgTXEcLrHKJHVriX4nu2NttImtwwbDFBhhNC3P1Gj"	
    });

let twitterQueries =
{
    getTrends: function(result)
    {
	twitterClient.get("trends/place", {id: "1"}, function(error, trends, response)
	    {
		if(error)
		    {
			console.log(error);
		    }

		else
		    {
			
			result(trends[0]);
		    }
	    });
    },
    getPopularTweet: function(rank, result)
    {
	this.getTrends(function(trends)
	    {
		twitterClient.get("search/tweets",
				  {
				      q: trends.trends[rank].name,
				      lang: "en",
				      result_type: "popular",
				      count: "10"
				  }, function(error, tweets, response)
		    {
			let tweet;
			for(let i = 0; i < tweets.statuses.length; i++)
			    {
				if(tweets.statuses[i])
				    {
					console.log(i + "th tweet from " + trends.trends[rank].name);
					tweet = tweets.statuses[i];
					break;
				    }
			    }
			result(tweet);
		    });
	    });
    } 
};

let api =
    {
	twitter: twitterQueries
    };
module.exports = api;
