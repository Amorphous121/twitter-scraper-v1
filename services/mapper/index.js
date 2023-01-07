
const userMapper = (userPayload) => {

    const userData = {};

    userData.name               = userPayload.name;
    userData.username           = userPayload.username;
    userData.location           = userPayload.location;
    userData.account_id         = userPayload.id;
    userData.is_Protected       = userPayload.protected;
    userData.verified           = userPayload.verified;
    userData.url                = userPayload.url;
    userData.created_at         = userPayload.created_at;
    userData.bio                = userPayload.description;
    userData.profile_image_url  = userPayload.profile_image_url;
    userData.following_count    = userPayload.public_metrics.following_count;
    userData.followers_count    = userPayload.public_metrics.followers_count;
    userData.tweet_count        = userPayload.public_metrics.tweet_count;
    userData.listed_count       = userPayload.public_metrics.listed_count;

    return userData;
};


const tweetMapper = (tweetPayload, created_by) => {
    let tweet_Data = {};

    tweet_Data.tweet_id                 = tweetPayload.id;
    tweet_Data.created_by               = created_by;
    tweet_Data.referenced_tweets        = tweetPayload.referenced_tweets?.map(tweet => tweet);
    tweet_Data.in_reply_to_user_id      = tweetPayload.in_reply_to_user_id;
    tweet_Data.tweet                    = tweetPayload.text;
    tweet_Data.author_id                = tweetPayload.author_id;
    tweet_Data.language                 = tweetPayload.lang;
    tweet_Data.reply_settings           = tweetPayload.reply_settings;
    tweet_Data.possibly_sensitive       = tweetPayload.possibly_sensitive
    tweet_Data.conversation_id          = tweetPayload.conversation_id;
    tweet_Data.source                   = tweetPayload.source;
    tweet_Data.created_at               = tweetPayload.created_at;
    tweet_Data.retweet_count            = tweetPayload.public_metrics.retweet_count;
    tweet_Data.reply_count              = tweetPayload.public_metrics.reply_count;
    tweet_Data.like_count               = tweetPayload.public_metrics.like_count;
    tweet_Data.quote_count              = tweetPayload.public_metrics.quote_count;
    tweet_Data.mentions                 = tweetPayload.entities?.mentions?.map(item => item.username);
    tweet_Data.hashtags                 = tweetPayload.entities?.hashtags?.map(item => item.tag);
    tweet_Data.attachment_media_keys    = tweetPayload.attachments?.media_keys;
    tweet_Data.annotations              = tweetPayload.entities?.annotations?.map(annotation => {
                                                return {
                                                    probability: annotation.probability,
                                                    type: annotation.type,
                                                    normalized_text: annotation.normalized_text
                                                }
    })
    tweet_Data.urls = tweetPayload.entities?.urls?.map(item => {
        return {
            url: item.url,
            expanded_url    : item.expanded_url,
            display_url     : item.display_url,
            images          : item.images?.map(image => {
                return {
                    url     : image.url,
                    height  : image.height,
                    width   : image.width,
                }
            }),
            status      : item.status,
            title       : item.title,
            description : item.description,
            unwound_url : item.unwound_url
        }
    })
    tweet_Data.context_annotations = tweetPayload.context_annotations?.map(item => {
        return {
            domain_name         : item.domain.name,
            domain_description  : item.domain.description,
            entity_name         : item.entity.name,
            entity_description  : item.entity.description
        }
    })
    return tweet_Data;
}

const tweetsMapper = (tweetsPayload = [], created_by) => {
    const transformedPayload = [];
    tweetsPayload.forEach(tweet => {
        let result = tweetMapper(tweet, created_by);
        transformedPayload.push(result);
    });

    return transformedPayload;
}

module.exports = {
    userMapper,
    tweetMapper,
    tweetsMapper,
}