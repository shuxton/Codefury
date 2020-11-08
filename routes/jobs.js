const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');
const jobs = require('../controllers/jobs');


router.route('/employer/jobDelete/:jobid/:uid')
    .post(isLoggedIn, jobs.delJobs)
router.route('/employer/jobEdit')
    .get(isLoggedIn, jobs.editJobs)
router.route('/employer')
    .get(isLoggedIn, jobs.renderDetails)
router.route('/employer/:id')
    .post(isLoggedIn, jobs.registerJobDetails)
router.route('/employer/edit/:id/:jobid')
    .post(isLoggedIn, jobs.editJobDetails)
router.route('/employer/:id')
    .get(isLoggedIn, jobs.listJobs)



module.exports = router;