// load the things we need
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Schemas for publication
var PhotoSchema = new Schema({
    ident: {type: String, required: false},
    location: {type: String, required: false},
    privacy: {type: String, required: false},
    title: {type: String, required: false},
    date: {type: Date, required: false},
    description: {type: String, required: false},
    type: {type: String, required: false},
    path: {type: String, required: false},
    people: {type: String, required: false}
})

var SportsRegistrySchema = new Schema({
    ident: {type: String, required: false},
    location: {type: String, required: false},
    privacy: {type: String, required: false},
    title: {type: String, required: false},
    date: {type: Date, required: false},
    description: {type: String, required: false},
    type: {type: String, required: false},
    sport: {type: String, required: false},
    duration: {type: String, required: false},
    gpxFile: {type: String, required: false},
    participants: {type: String, required: false},
    results: {type: String, required: false},
    //photo: [PhotoSchema]
})
/*
var PhotoAlbumSchema = new Schema({
    ident: {type: String, required: false},
    location: {type: String, required: false},
    privacy: {type: String, required: false},
    title: {type: String, required: false},
    date: {type: Date, required: false},
    description: {type: String, required: false},
    type: {type: String, required: false},
    album_title: {type: String, required: false},
    //album: [PhotoSchema]
})*/

var AcademicRegistrySchema = new Schema({
    ident: {type: String, required: false},
    location: {type: String, required: false},
    privacy: {type: String, required: false},
    title: {type: String, required: false},
    date: {type: Date, required: false},
    description: {type: String, required: false},
    type: {type: String, required: false},
    duration: {type: String, required:false},
    credits: {type: String, required: false}
})

var eventSchema = new Schema({
    ident: {type: String, required: false},
    location: {type: String, required: false},
    privacy: {type: String, required: false},
    title: {type: String, required: false},
    date: {type: Date, required: false},
    description: {type: String, required: false},
    type: {type: String, required: false},
    files: {type: String, required: false},
    guests: {type: String, required: false},
    hosts: {type: String, required: false},
    eventType: {type: String, require: false},
    text: {type: String, required: false}
})

var ThoughtSchema = new Schema({
    ident: {type: String, required: false},
    location: {type: String, required: false},
    privacy: {type: String, required: false},
    title: {type: String, required: false},
    date: {type: Date, required: false},
    description: {type: String, required: false},
    type: {type: String, required: false},
    keywords: {type: String, required: false},
    text: {type:String, required: false}
})

var IdeaSchema = new Schema({
    ident: {type: String, required: false},
    location: {type: String, required: false},
    privacy: {type: String, required: false},
    title: {type: String, required: false},
    date: {type: Date, required: false},
    description: {type: String, required: false},
    type: {type: String, required: false},
    keywords: {type: String, required: false},
    priority: {type: String, required: false},
    text: {type:String, required: false}
})

var RecipeSchema = new Schema({
    ident: {type: String, required: false},
    location: {type: String, required: false},
    privacy: {type: String, required: false},
    title: {type: String, required: false},
    date: {type: Date, required: false},
    description: {type: String, required: false},
    type: {type: String, required: false},
    ingredients: {type: String, required: false},
    instructions: {type: String, required: false}
})

var BirthSchema = new Schema({
    ident: {type: String, required: false},
    location: {type: String, required: false},
    privacy: {type: String, required: false},
    title: {type: String, required: false},
    date: {type: Date, required: false},
    description: {type: String, required: false},
    type: {type: String, required: false},
    name: {type: String, required: false},
    gender: {type: String, required: false},
    parents: {type: String, required: false}
})

var WeddingSchema = new Schema({
    ident: {type: String, required: false},
    location: {type: String, required: false},
    privacy: {type: String, required: false},
    title: {type: String, required: false},
    date: {type: Date, required: false},
    description: {type: String, required: false},
    type: {type: String, required: false},
    couple: {type: String, required: false},
    guests: {type: String, required: false},
    menu: {type: String, required: false}
})

var AcademicWorkSchema = new Schema({
    ident: {type: String, required: false},
    location: {type: String, required: false},
    privacy: {type: String, required: false},
    title: {type: String, required: false},
    date: {type: Date, required: false},
    description: {type: String, required: false},
    type: {type: String, required: false},
    course: {type: String, required: false},
    professor: {type: String, required: false},
    file: {type: String, required: false},
    classification: {type: String, required: false}
})

var ChronicleSchema = new Schema({
    ident: {type: String, required: false},
    location: {type: String, required: false},
    privacy: {type: String, required: false},
    title: {type: String, required: false},
    date: {type: Date, required: false},
    description: {type: String, required: false},
    type: {type: String, required: false},
    theme: {type: String, required: false},
    text: {type: String, required: false}
})

/*
var PublicationSchema = new Schema({
    ident: {type: String, required: false},
    location: {type: String, required: false},
    privacy: {type: String, required: false},
    title: {type: String, required: false},
    date: {type: Date, required: false},
    description: {type: String, required: false},
    type: {type: String, required: false}
})
*/

// create the model for users and expose it to our app
//module.exports = mongoose.model('Post', PublicationSchema, 'posts');
module.exports = mongoose.model('Photo', PhotoSchema, 'posts');
module.exports = mongoose.model('SportsRegistry', SportsRegistrySchema, 'posts');
//module.exports = mongoose.model('PhotoAlbum', PhotoAlbumSchema, 'posts');
module.exports = mongoose.model('AcademicRegistry', AcademicRegistrySchema, 'posts');
//module.exports = mongoose.model('ScientificEvent', ScientificEventSchema, 'posts');
module.exports = mongoose.model('Thought', ThoughtSchema, 'posts');
module.exports = mongoose.model('Idea', IdeaSchema, 'posts');
module.exports = mongoose.model('Recipe', RecipeSchema, 'posts');
module.exports = mongoose.model('Birth', BirthSchema, 'posts');
module.exports = mongoose.model('Wedding', WeddingSchema, 'posts');
module.exports = mongoose.model('AcademicWork', AcademicWorkSchema, 'posts');
module.exports = mongoose.model('Chronicle', ChronicleSchema, 'posts');

