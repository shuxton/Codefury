const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');
const accomodate = require('../controllers/accomodate');

router.route('/accomodate')
    .get(isLoggedIn  ,accomodate.renderAccomodate)
router.route('/accomodate/:id')
.post(isLoggedIn , accomodate.postDetails)

router.route('/accomodate/views')
    .get(accomodate.viewAllAccomodates)

module.exports = router;
