const mongoose = require('mongoose');
const { dbUrl } = require('../config');
const chalk = require('chalk');

const connect = async () => {
    try {
        
        await mongoose.connect(dbUrl);

        console.log("\n", chalk.bgGreen.whiteBright("          Database Connected. 😁          "))

    } catch (error) {
        console.log("\n\n" + chalk.bgRedBright(error.message) + '😒');
        process.exit(1);
    }
}

module.exports = { connect };