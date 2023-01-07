const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    name                : { type: String, default: '' },
    username            : { type: String, default: '' },
    url                 : { type: String, default: '' },
    location            : { type: String, default: '' },
    verified            : { type: Boolean, default: false },
    account_id          : { type: String, default : '' },
    is_Protected        : { type: Boolean, default: false },
    bio                 : { type: String, default: false },
    profile_image_url   : { type: String, default: '' },
    followers_count     : { type: Number, default: 0 },
    following_count     : { type: Number, default: 0 },
    tweet_count         : { type: Number, default: 0 },
    listed_count        : { type: Number, default: 0 },
    tweets              : [{ type: mongoose.Types.ObjectId, ref: 'tweet' }],
    created_at          : { type: Date } 

}, { versionKey: false });


module.exports = mongoose.model('twitter_user', userSchema);