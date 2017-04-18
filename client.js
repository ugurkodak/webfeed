//Set API keys
let twitter = require("twitter");
let twitterClient = new twitter(
    {
	consumer_key: "a6K1B1gT2ImeXKHJOw0voPGox",
	consumer_secret: "psA4hodgf7h9Y0OrpssO8t1c1pVm0p4lFeXuj5mNuPpxM49cvF",
	access_token_key: "122784300-wSnL7h757J9zig7wgOZeJya0I0G1yhDjub3T4N8v",
	access_token_secret: "xNeNNgTXEcLrHKJHVriX4nu2NttImtwwbDFBhhNC3P1Gj"	
    });

let youtube = require("youtube-node");
let youtubeClient = new youtube();
youtubeClient.setKey("AIzaSyAZjNjIkYF3s70dAar2h_Z9FScBYRKyDZk");

let reddit = require("snoowrap");
let redditClient = new reddit(
    {
	userAgent: "webfeedServer",
	clientId: "xTxtlsAF6ZUjvQ",
	clientSecret: "2B_N7712tgQlbVAcrqwfa8aZ9ok",
	username: "boogie_improper",
	password: "789987789"
    });

let client =
    {
	twitterClient: twitterClient,
	youtubeClient: youtubeClient,
	redditClient: redditClient
    }
module.exports = client;
