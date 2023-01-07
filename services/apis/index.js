exports.getUserByUsername = (userName) => `https://api.twitter.com/2/users/by/username/${userName}`

exports.getUserById = userId => `https://api.twitter.com/2/users/${userId}?user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld`

exports.getTweetsOfUser = (userId, limit) => `https://api.twitter.com/2/users/${userId}/tweets?tweet.fields=attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,reply_settings,source,text,withheld&expansions=author_id&user.fields=created_at&max_results=${limit}`;