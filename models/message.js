var mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
     name : String,
     message : String,
     userid: String
});

module.exports = mongoose.model("Message", messageSchema);