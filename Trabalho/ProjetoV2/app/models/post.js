// load the things we need
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Schemas for publication
var PhotoSchema = new Schema({
    ident:  String, 
    location:  String, 
    privacy:  String, 
    title:  String, 
    date:  Date, 
    description:  String, 
    type:  String, 
    path:  String, 
    people:  String
})

var SportsRegistrySchema = new Schema({
    ident:  String, 
    location:  String, 
    privacy:  String, 
    title:  String, 
    date:  Date, 
    description:  String, 
    type:  String, 
    sport:  String, 
    duration:  String, 
    gpxFile:  String, 
    participants:  String, 
    results:  String
    //photo: [PhotoSchema]
})
/*
var PhotoAlbumSchema = new Schema({
    ident:  String, 
    location:  String, 
    privacy:  String, 
    title:  String, 
    date:  Date, 
    description:  String, 
    type:  String, 
    album_title:  String
    //album: [PhotoSchema]
})*/

var AcademicRegistrySchema = new Schema({
    ident:  String, 
    location:  String, 
    privacy:  String, 
    title:  String, 
    date:  Date, 
    description:  String, 
    type:  String, 
    duration:  String,
    credits:  String
})

var eventSchema = new Schema({
    ident:  String, 
    location:  String, 
    privacy:  String, 
    title:  String, 
    date:  Date, 
    description:  String, 
    type:  String, 
    files:  String, 
    guests:  String, 
    hosts:  String, 
    eventType:  String,
    text:  String
})

var ThoughtSchema = new Schema({
    ident:  String, 
    location:  String, 
    privacy:  String, 
    title:  String, 
    date:  Date, 
    description:  String, 
    type:  String, 
    keywords:  String, 
    text: String
})

var IdeaSchema = new Schema({
    ident:  String, 
    location:  String, 
    privacy:  String, 
    title:  String, 
    date:  Date, 
    description:  String, 
    type:  String, 
    keywords:  String, 
    priority:  String, 
    text: String
})

var RecipeSchema = new Schema({
    ident:  String, 
    location:  String, 
    privacy:  String, 
    title:  String, 
    date:  Date, 
    description:  String, 
    type:  String, 
    ingredients:  String, 
    instructions:  String
})

var BirthSchema = new Schema({
    ident:  String, 
    location:  String, 
    privacy:  String, 
    title:  String, 
    date:  Date, 
    description:  String, 
    type:  String, 
    name:  String, 
    gender:  String, 
    parents:  String
})

var WeddingSchema = new Schema({
    ident:  String, 
    location:  String, 
    privacy:  String, 
    title:  String, 
    date:  Date, 
    description:  String, 
    type:  String, 
    couple:  String, 
    guests:  String, 
    menu:  String
})

var AcademicWorkSchema = new Schema({
    ident:  String, 
    location:  String, 
    privacy:  String, 
    title:  String, 
    date:  Date, 
    description:  String, 
    type:  String, 
    course:  String, 
    professor:  String, 
    file:  String, 
    classification:  String
})

var ChronicleSchema = new Schema({
    ident:  String, 
    location:  String, 
    privacy:  String, 
    title:  String, 
    date:  Date, 
    description:  String, 
    type:  String, 
    theme:  String, 
    text:  String
})

/*
var PublicationSchema = new Schema({
    ident:  String, 
    location:  String, 
    privacy:  String, 
    title:  String, 
    date:  Date, 
    description:  String, 
    type:  String
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

