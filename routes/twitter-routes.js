const express = require('express');
const router = express.Router();
const Arena = require('bull-arena');
const Bull = require('bull');
const USER_CONTROLLER = require('../controllers/user');

const arenaConfig = Arena(
    {
        Bull,
        queues: [
            {
                hostId: 'InitalQueue',
                name: 'initialUserScrapQueue',
                redis: {
                    port: 6379,
                    host: '127.0.0.1',
                },
            }
        ],
    }
);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/initialScrape', USER_CONTROLLER.initialScraping);

router.post('/addUserToScrapeList', USER_CONTROLLER.addUserToScrapeList);

router.post('/removeUserFromScrpeList', USER_CONTROLLER.removeUserFromScrpeList);

router.use('/arena', arenaConfig);

module.exports = router;
