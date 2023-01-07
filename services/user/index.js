const Queue = require('bull');
const USER = require('../../models/user-model');
const TWEET = require('../../models/tweet-model');
const { userMapper, tweetsMapper } = require('../mapper');


const initialUserScrapQueue = new Queue('initialUserScrapQueue', {
    redis: {
        host: '127.0.0.1',
        port: 6379
    }
});


const insertInitialScrapData = async ({ userData, userTweets }) => {
    try {

        const mappedUser = userMapper(userData);
        const user = await USER.create(mappedUser);
        
        const mappedTweets = tweetsMapper(userTweets, user.id);
        
        const result = await TWEET.insertMany(mappedTweets);
        
        const tweetIds = result.map(tweet => tweet._id);
        
        await USER.updateOne({ _id: user._id }, { $addToSet: { tweets: tweetIds }});

        return Promise.resolve();

    } catch (error) {
        throw error;
    }
}

initialUserScrapQueue.process(async job => {
    await insertInitialScrapData(job.data);
})

module.exports = {
    initialUserScrapQueue,
    insertInitialScrapData
}