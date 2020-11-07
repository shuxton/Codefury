const User = require('../models/user');
const Job = require('../models/jobs');

module.exports.renderAccomodate = (req, res) => {
    res.render('accomodates/accomodate');
}