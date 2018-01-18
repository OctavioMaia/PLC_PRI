// load the things we need
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Schemas for publication
var BirthSchema = new Schema({
    ident: {type: String, required: true},
    location: {type: String, required: false},
    privacy: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    name: {type: String, required: true},
    gender: {type: String, required: true},
    parents: {type: String, required: true}
})

module.exports = mongoose.model('Birth', BirthSchema, 'posts');