// load the things we need
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Schemas for publication
var PhotoSchema = new Schema({
    ident: {type: String, required: true},
    location: {type: String, required: false},
    privacy: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    path: {type: String, required: true},
    people: {type: String, required: false}
})

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
/*
var PhotoAlbumSchema = new Schema({
    ident: {type: String, required: true},
    location: {type: String, required: false},
    privacy: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    album_title: {type: String, required: true},
    //album: [PhotoSchema]
})*/

var AcademicRegistrySchema = new Schema({
    ident: {type: String, required: true},
    location: {type: String, required: false},
    privacy: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    duration: {type: String, required:false},
    credits: {type: String, required: true}
})

var eventSchema = new Schema({
    ident: {type: String, required: true},
    location: {type: String, required: false},
    privacy: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    files: {type: String, required: true},
    guests: {type: String, required: false},
    hosts: {type: String, required: false},
    eventType: {type: String, require: true},
    text: {type: String, required: false}
})

var ThoughtSchema = new Schema({
    ident: {type: String, required: true},
    location: {type: String, required: false},
    privacy: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    key_words: {type: String, required: true},
    text: {type:String, required: true}
})

var IdeaSchema = new Schema({
    ident: {type: String, required: true},
    location: {type: String, required: false},
    privacy: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    key_words: {type: String, required: true},
    priority: {type: String, required: true},
    text: {type:String, required: true}
})

var RecipeSchema = new Schema({
    ident: {type: String, required: true},
    location: {type: String, required: false},
    privacy: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    ingredients: {type: String, required: true},
    instructions: {type: String, required: true}

})

var BirthSchema = new Schema({
    ident: {type: String, required: true},
    location: {type: String, required: false},
    privacy: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    child_name: {type: String, required: true},
    child_gender: {type: String, required: true},
    parents: {type: String, required: true}
})

var WeddingSchema = new Schema({
    ident: {type: String, required: true},
    location: {type: String, required: false},
    privacy: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    couple: {type: String, required: true},
    guests: {type: String, required: true},
    menu: {type: String, required: false}
})

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

/*
var PublicationSchema = new Schema({
    ident: {type: String, required: true},
    location: {type: String, required: false},
    privacy: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true}
})
*/

// create the model for users and expose it to our app
//module.exports = mongoose.model('Post', PublicationSchema, 'posts');
module.exports = mongoose.model('Photo', PhotoSchema, 'posts');
module.exports = mongoose.model('SportsRegistry', SportsRegistrySchema, 'posts');
module.exports = mongoose.model('PhotoAlbum', PhotoAlbumSchema, 'posts');
module.exports = mongoose.model('AcademicRegistry', AcademicRegistrySchema, 'posts');
module.exports = mongoose.model('ScientificEvent', ScientificEventSchema, 'posts');
module.exports = mongoose.model('Thought', ThoughtSchema, 'posts');
module.exports = mongoose.model('Idea', IdeaSchema, 'posts');
module.exports = mongoose.model('Recipe', RecipeSchema, 'posts');
module.exports = mongoose.model('Birth', BirthSchema, 'posts');
module.exports = mongoose.model('Wedding', WeddingSchema, 'posts');
module.exports = mongoose.model('AcademicWork', AcademicWorkSchema, 'posts');
module.exports = mongoose.model('Chronicle', ChronicleSchema, 'posts');

