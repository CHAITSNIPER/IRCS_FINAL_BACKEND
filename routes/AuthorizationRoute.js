const router = require('express').Router();
const { CheckAdmin,isValidToken } = require('../Controllers/AuthController');


router.post('/AuthProcedure',CheckAdmin);
router.get('/CheckValidity/:token',isValidToken);

module.exports = router;