// load the things we need
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Schemas for publication
var AcademicWorkSchema = new Schema({
    ident: {type: String, required: true},
    location: {type: String, required: false},
    privacy: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    course: {type: String, required: false},
    professor: {type: String, required: true},
    gpxFile: {type: String, required: true},
    classification: {type: String, required: true}
})

module.exports = mongoose.model('AcademicWork', AcademicWorkSchema, 'posts');