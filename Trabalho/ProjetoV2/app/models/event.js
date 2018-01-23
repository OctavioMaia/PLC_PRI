// load the things we need
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Schemas for publication
var eventSchema = new Schema({
    author: {type: String, required: true},
    ident: {type: String, required: true},
    location: {type: String, required: false},
    privacy: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: Date, required: true},
    pubdate: {type: Date, default: Date.now},
    description: {type: String, required: true},
    type: {type: String, required: true},
    files: {type: String, required: true},
    guests: {type: String, required: false},
    hosts: {type: String, required: false},
    eventType: {type: String, require: true},
    text: {type: String, required: false}
})

module.exports = mongoose.model('Event', eventSchema, 'posts');
