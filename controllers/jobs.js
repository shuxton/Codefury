const User = require('../models/user');
const Job = require('../models/jobs');


module.exports.renderDetails = (req, res) => {
  res.render('postAdd/postAdd');
}

module.exports.registerDetails = async (req, res) => {
  User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        phoneNumber: req.params.phoneNumber,
        address: req.params.address,
        emp: req.params.emp
      }
    }, function (err, res) {
      if (err)
        console.log(err)
      else
        console.log(res)
    }
  )
}

module.exports.registerJobDetails = async (req, res) => {
  Job.insertMany(

    {
      userid: req.params.id,
      jobType: req.body.jobType,
      description: req.body.description,
      location: req.body.location,
      salary: req.body.salary,
      city: req.body.city.toLowerCase() // lowercase
    }
    , function (err, res) {
      if (err)
        console.log(err)
      else
        console.log(res)
    }
  )
  res.render('home')
}