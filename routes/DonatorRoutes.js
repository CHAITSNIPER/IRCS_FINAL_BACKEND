const router = require('express').Router();

const { createDon,DonatorsDeets,SearchedDon } = require('../Controllers/DonatorController');


router.post('/postDonator',createDon);
router.get('/donatorDetails',DonatorsDeets);
router.get('/SearchedDonator/:firstname',SearchedDon);

module.exports = router;