const router = require('express').Router();
const {getProjects,getSelectedProjs} = require('../Controllers/ProjectController')
router.get('/getAllProjects',getProjects);
router.get('/getSelectedProjects/:_id', getSelectedProjs);


module.exports = router;