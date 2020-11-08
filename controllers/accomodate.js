const User = require('../models/user');
const Accomodate = require('../models/accomodate');

module.exports.renderAccomodate = (req, res) => {
    res.render('accomodates/accomodate');
}

module.exports.viewAllAccomodates = async (req , res) => {
    const accomodates = await Accomodate.find({});
    res.render('accomodates/viewAccomodate', { accomodates })
}

module.exports.postDetails = async (req, res) => {
    Accomodate.insertMany(

        {
          userid: req.params.id,
          name: req.body.name,
          price: req.body.price,
          officialNumber: req.body.officialNumber , 
          city: req.body.city.toLowerCase() // lowercase
        }
        , function (err, res) {
          if (err)
            console.log(err)
          else
            console.log(res)
        }
      )

    //res.render('home')
}