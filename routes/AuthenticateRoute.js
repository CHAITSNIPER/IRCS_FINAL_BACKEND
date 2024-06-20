const router = require('express').Router();
const { AddProjects,deleteSelectedProject } = require('../Controllers/ProjectController');

router.post('/postProjects',AddProjects);
router.delete('/deleteProjects/:_id',deleteSelectedProject);

module.exports = router;