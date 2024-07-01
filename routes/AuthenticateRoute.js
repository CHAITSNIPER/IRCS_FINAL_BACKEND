const router = require('express').Router();
const { AddProjects,deleteSelectedProject } = require('../Controllers/ProjectController');
const { deleteDonators } = require('../Controllers/DonatorController');

router.post('/postProjects',AddProjects);
router.delete('/deleteProjects/:_id',deleteSelectedProject);
router.delete('/deleteDonators/:_id',deleteDonators);

module.exports = router;