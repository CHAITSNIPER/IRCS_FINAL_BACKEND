const router = require('express').Router();
const { ChatWithBot } = require('../Controllers/AIController');


router.post('/ChatRoute',ChatWithBot);

module.exports = router;