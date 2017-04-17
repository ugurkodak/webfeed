let client = require(__dirname + "/client");

let twitterQueries =
    {
	getTrends: function(result)
	{
	    client.twitterClient.get("trends/place", {id: "1"}, function(error, trends, response)
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
		    client.twitterClient.get("search/tweets",
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

let youtubeQueries =
    {
	getPopular: function(count, result)
	{
	    client.youtubeClient.request("https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults="+count+"&key=AIzaSyAZjNjIkYF3s70dAar2h_Z9FScBYRKyDZk", function(error, videos)
		{
		    if (error)
			{
			    console.log(error);
			}
		    else
			{
			    result(videos);
			}
		});
	}
    };

let redditQueries =
    {
 	getHot: function(limit, result)
 	{
	    result(client.redditClient.getHot({limit: limit}));
 	}
    }

let api =
    {
	twitter: twitterQueries,
	youtube: youtubeQueries,
	reddit: redditQueries,
    };
module.exports = api;
