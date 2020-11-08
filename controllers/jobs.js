const User = require('../models/user');
const Job = require('../models/jobs');


module.exports.renderDetails = (req, res) => {
  res.render('postAdd/postAdd');
}

module.exports.listJobs = (req, res) => {
  Job.find({ userid: req.params.id }, function (err, val) {
    User.find({appliedTo:req.params.id}, function (err, user) {
      res.render('users/jobList', {search: true, jobs: val, applied:user[0] })

    })
    
})
}

module.exports.delJobs = (req, res) => {
  Job.deleteOne({ _id: req.params.jobid }, function (err, val) {
    if(err)console.log(err)
    res.redirect('/employer/'+req.params.uid)
    
})
}

module.exports.editJobs = (req, res) => {
  Job.find({ _id: req.query.jobid }, function (err, val) {
    if(err)console.log(err)
    res.render('postAdd/editAdd',{jobs:val[0]})
    
})
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
  res.redirect('/employer/'+req.params.id)
}

module.exports.editJobDetails = async (req, res) => {
  Job.updateMany({_id:req.params.jobid},

    {$set:{
      userid: req.params.id,
      jobType: req.body.jobType,
      description: req.body.description,
      location: req.body.location,
      salary: req.body.salary,
      city: req.body.city.toLowerCase() // lowercase
    }}
    , function (err, res) {
      if (err)
        console.log(err)
      else
        console.log(res)
    }
  )
  res.redirect('/employer/'+req.params.id)
}