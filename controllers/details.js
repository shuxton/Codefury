const User  = require('../models/user');

module.exports.renderPostAdd = (req, res) => {
    res.render('postAdd/postAdd');
}

module.exports.registerDetails = async (req , res) => {
    User.updateOne(
        {_id: req.params.id},
        {$set: {
          phoneNumber: req.params.phoneNumber , 
          address: req.params.address , 
          emp: req.params.emp 
        }
      }, function (err, res) {
        if(err)
        console.log(err)
        else
        console.log(res)
        }
      )
}