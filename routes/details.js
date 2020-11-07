const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');
const details = require('../controllers/details');
const cors = require('./cors');

router.route('/post-ad')
    .get(cors.corsWithOptions, isLoggedIn, details.renderPostAdd)

module.exports = router;