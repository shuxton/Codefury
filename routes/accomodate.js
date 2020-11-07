const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');
const accomodate = require('../controllers/accomodate');

router.route('/accomodate')
    .get(accomodate.renderAccomodate)

module.exports = router;
