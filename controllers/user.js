const axios = require('axios');
const fs = require('fs/promises');
const blueBird = require('bluebird');
const _ = require('lodash');

const { axiosConfig } = require('../config');
const { getUserByUsername, getUserById, getTweetsOfUser } = require('../services/apis');
const USER = require('../models/user-model');
const TWEET = require('../models/tweet-model');
const { initialUserScrapQueue } = require('../services/user');

exports.initialScraping = async (req, res, next) => {
    try {

        const fileData = await fs.readFile('./source/index.json')
        const userList = JSON.parse(fileData);
        
        const updatedInfo = [];

        await blueBird.map(userList, (twitterUser, index) => {
            return new Promise(async (resolve, reject) => {

                if (!twitterUser.id) {   

                    const { data: { data } } = await axios.get(getUserByUsername(twitterUser.username), axiosConfig);
                    twitterUser = data;
                    updatedInfo.push({...data, index});
                }
    
                const userData = await axios.get(getUserById(twitterUser.id), axiosConfig);
                const { data: { data : { id } } } = userData;
                const userTweets = await axios.get(getTweetsOfUser(id, 100), axiosConfig);
    
                initialUserScrapQueue.add({ 
                    userData: userData.data.data, 
                    userTweets: userTweets.data.data 
                }, { attempts: 2, removeOnComplete: true });

                return resolve();                        
            })
        })

        updatedInfo.forEach(item => {  
            userList[item.index] = _.omit(item, ['index']);
        })

        await fs.writeFile('./source/index.json', JSON.stringify(userList), 'utf-8');
        return res.send("Initial Scrapping Started...");

    } catch (error) {
        return next(error);
    }
}


exports.addUserToScrapeList = async (req, res, next) => {
    try {
        const fileData = await fs.readFile('./source/index.json')
        const userList = JSON.parse(fileData);

        const { username } = req.body;
        
        const { data: { data } } = await axios.get(getUserByUsername(username), axiosConfig);
        
        userList.push(data);

        console.log("user List", userList)

        await fs.writeFile('./source/index.json', JSON.stringify(userList), 'utf-8');
        
        return res.send("User has been added to scrape list. ");


    } catch (error) {
        return next(error);
    }
}

exports.removeUserFromScrpeList = async (req ,res ,next) => {
    try {

        const fileData = await fs.readFile('./source/index.json')

        const userList = JSON.parse(fileData);

        const { username } = req.body;

        const neWUserList = userList.filter(item => item.username !== username );

        if (userList.length === neWUserList.length)
            return res.send("No such user exists in scrapping list.");

        await fs.writeFile('./source/index.json', JSON.stringify(neWUserList), 'utf-8');

        return res.send("User has been removed from scrapping list.")

    } catch (error) {
        return next(error);
    }
}