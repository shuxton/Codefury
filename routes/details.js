const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn} = require('../middleware');
const details = require('../controllers/details');

router.route('/post-ad')
    .get(isLoggedIn ,  details.renderPostAdd)
    
module.exports = router;