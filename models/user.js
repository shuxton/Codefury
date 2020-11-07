const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String , 
        required: true, 
        unique: true
    } , 
    phoneNumber: {
        type: Number ,  
    } , 
    address: {
        type: String , 
         
    } , 
    emp: {
        type: Boolean ,     
    } ,
    appliedTo: {
        type: String ,
    },
    appliedBy:{
        type: String,
    },
    toJobId:{
        type: String,
    },
    byJobId:{
        type: String,
    },
    sid:{
        type:String
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User' , UserSchema);