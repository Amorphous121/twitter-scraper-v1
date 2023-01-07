const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({

    tweet_id                : { type: String, default: '' },
    created_by              : { type: mongoose.Types.ObjectId, ref: 'twitter_user' },
    referenced_tweets       : [{ _id: false, type: { type: String }, id: { type: String }}],
    in_reply_to_user_id     : { type: String },
    tweet                   : { type: String, default: '' },
    author_id               : { type: String },
    language                : { type: String, default: 'en' },
    reply_settings          : { type: String, default: 'everyone' },
    possibly_sensitive      : { type: Boolean, default: false },
    conversation_id         : { type: String, default: '' },
    source                  : { type: String, default: 'false' },
    created_at              : { type: String, default: Date.now() },
    retweet_count           : { type: Number, default: 0 },
    reply_count             : { type: Number, default: 0 },
    like_count              : { type: Number, default: 0 },
    quote_count             : { type: Number, default: 0 },
    mentions                : [{ type: String }],
    attachment_media_keys   : [{ type: String }],
    urls                    : [{ 
                                    _id                 : false,
                                    url                 : { type: String }, 
                                    display_url         : { type: String }, 
                                    expanded_url        : { type: String },
                                    images: [{
                                        _id             : false, 
                                        url             : { type: String },
                                        height          : { type: Number },
                                        width           : { type: Number }
                                    }],
                                    status              : { type: Number },
                                    title               : { type: String },
                                    description         : { type: String },
                                    unwound_url         : { type: String }
    }],
    annotations: [{
        probability         : { type: Number },
        type                : { type: String },
        normalized_text     : { type: String }
    }],
    hashtags                : [{ type: String }],
    context_annotations     : [{ 
                                    _id                 : false, 
                                    domain_name         : { type: String }, 
                                    domain_description  : { type: String }, 
                                    entity_name         : { type: String }, 
                                    entity_description  : { type: String }
    }]

}, { versionKey: false });
 
module.exports = mongoose.model('tweet', TweetSchema);