// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    local            : {
        email        : {type: String, required:false},
        password     : {type: String, required:false},
        name         : {type: String, required:false},
        age          : {type: String, required:false},
        gender       : {type: String, required:false},
        address      : {type: String, required:false},
        profession   : {type: String, required:false},
        cnumber      : {type: String, required:false}
    },
    facebook         : {
        id           : {type: String, required:false},
        token        : {type: String, required:false},
        name         : {type: String, required:false},
        age          : {type: String, required:false},
        email        : {type: String, required:false},
        gender       : {type: String, required:false},
        address      : {type: String, required:false},
        profession   : {type: String, required:false},
        cnumber      : {type: String, required:false}
    },
    google           : {
        id           : {type: String, required:false},
        token        : {type: String, required:false},
        email        : {type: String, required:false},
        name         : {type: String, required:false},
        age          : {type: String, required:false},
        gender       : {type: String, required:false},
        address      : {type: String, required:false},
        profession   : {type: String, required:false},
        cnumber      : {type: String, required:false}
    }

});

//Schemas for publication

var SportsRegistrySchema = new Schema({
    sport: {type: String, required: true},
    duration: {type: String, required: false},
    gpxFile: {type: String, required: true},
    participants: {type: [String], required: true},
    results: {type: String, required: true},
    photo: [PhotoSchema]
})

var PhotoAlbumSchema = new Schema({
    album_title: {type: String, required: true},
    album: [PhotoSchema]
})

var PhotoSchema = new Schema({
    path: {type: String, required: true},
    people: {type: [String], required: false}
})

var AcademicRegistrySchema = new Schema({
    duration: {type: String, required:false},
    credits: {type: String, required: true}
})

var ScientificEventSchema = new Schema({
    files: {type: [String], required: true},
    guests: {type: [String], required: true}
})

var ThoughtSchema = new Schema({
    key_words: {type: [String], required: true}
})

var IdeaSchema = new Schema({
    key_words: {type: [String], required: true},
    priority: {type: String, required: true}
})

var RecipeSchema = new Schema({
    ingredients: {type: [String], required: true},
    instructions: {type: String, required: true}

})

var BirthSchema = new Schema({
    child_name: {type: String, required: true},
    child_gender: {type: String, required: true},
    parents: {type: [String], required: true}
})

var WeddingSchema = new Schema({
    couple: {type: [String], required: true},
    guests: {type: [String], required: true},
    menu: {type: [String], required: false}
})

var AcademicWorkSchema = new Schema({
    course: {type: String, required: false},
    professor: {type: String, required: true},
    gpxFile: {type: String, required: true},
    classification: {type: String, required: true}
})

var ChronicleSchema = new Schema({
    theme: {type: String, required: true},
    text: {type: String, required: true}
})

var PublicationSchema = new Schema({
    ident: {type: String, required: true},
    location: {type: String, required: false},
    privacy: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: String, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
	notes: {"oneOf": [  
        {wedding: WeddingSchema},
        {recipe: RecipeSchema},
        {birth: BirthSchema},
        {thought: ThoughtSchema},
        {idea: IdeaSchema},
        {scientificEvent: ScientificEventSchema},
        {academicRegistry: AcademicRegistrySchema},
        {photo: PhotoSchema},
        {photoAlbum: PhotoAlbumSchema},
        {sportsRegistry: SportsRegistrySchema},
        {academicRegistry: AcademicRegistrySchema},
        {chronicle: ChronicleSchema}
    ]}
})

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema, 'users');
