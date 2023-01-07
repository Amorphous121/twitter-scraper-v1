const  express = require('express');
const router = express.Router();

/* GET home page. */
router.use('/twitter', require('./twitter-routes.js'));

module.exports = router;
  