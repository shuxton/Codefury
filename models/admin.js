var mongoose = require("mongoose");

var hostSchema = new mongoose.Schema({
  categories: Array,
});

module.exports = mongoose.model("Host", hostSchema);