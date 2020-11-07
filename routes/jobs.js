const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn} = require('../middleware');
const jobs = require('../controllers/jobs');

router.route('/employer')
    .get(isLoggedIn ,  jobs.renderDetails)
router.route('/employer/:id')  
.post(isLoggedIn , jobs.registerJobDetails)
module.exports = router;