// load the things we need
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Schemas for publication
var ChronicleSchema = new Schema({
    ident: {type: String, required: true},
    location: {type: String, required: false},
    privacy: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    theme: {type: String, required: true},
    text: {type: String, required: true}
})

//export
module.exports = mongoose.model('Chronicle', ChronicleSchema, 'posts');