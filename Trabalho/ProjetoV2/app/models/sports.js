// load the things we need
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Schemas for publication
var SportsRegistrySchema = new Schema({
    ident: {type: String, required: true},
    location: {type: String, required: false},
    privacy: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    sport: {type: String, required: true},
    duration: {type: String, required: true},
    gpxFile: {type: String, required: false},
    participants: {type: String, required: false},
    results: {type: String, required: false},
    //photo: [PhotoSchema]
})

module.exports = mongoose.model('SportsRegistry', SportsRegistrySchema, 'posts');