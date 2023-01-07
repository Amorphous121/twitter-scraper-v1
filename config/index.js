require('dotenv').config();

module.exports = {

    dbUrl                   : "mongodb://localhost:27017/twitter-scrape-v1",
    twitterApiToken         : process.env.TWITTER_API_TOKEN,
    twitterApiKey           : process.env.TWITTER_API_KEY,
    twitterApiKeySecret     : process.env.TWITTER_API_KEY_SECRET,

    axiosConfig : {
        headers : {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + "",
            'User-Agent' : 'PostmanRuntime/7.26.8',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
        }     
    },

    port:  process.env.PORT,

}
