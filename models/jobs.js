const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const JobSchema = new Schema({
    name:{
        type: String , 
    } , 

    jobType: {
        type: String , 
    } , 
    description: {
        type: String ,  
    } , 
    location: {
        type: String , 
         
    } , 
    salary: {
        type: Number ,     
    } , 
    city: {
        type: String 
    }, 
    userid: {
        type: String
    }
    // negotiable: {
    //     type: String , 
    // }
});

module.exports = mongoose.model('Job' , JobSchema);