const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const accomodateSchema = new Schema({
    name: {
        type: String , 
    } , 
    city: {
        type : String , 
    } , 
    price: {
        type: Number , 
    } , 
    officialNumber: {
        type: Number , 
    } , 
    userid: {
        type: String ,
    }
}) ; 

module.exports = mongoose.model('Accomodate' , accomodateSchema);