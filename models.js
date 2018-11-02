const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var qs = new Schema({
    question : String,
    option1 : String,
    option2 : String,
    option3 : String,
    option4 : String
})

var qrs = mongoose.model('qrs',qs);
module.exports = qrs;