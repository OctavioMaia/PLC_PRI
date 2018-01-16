var mongoose = require('mongoose')
var Schema = mongoose.Schema

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

var EuSchema = new Schema({
	ident: {type: String, required: true},
	name: {type: String, required: true},
	age: {type: String, required: true},
    gender: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    profession: {type: String, required: true},
    phoneNumber: {type: String, required: true},
	publition: [PublicationSchema]
})

//Exportações do módulo
module.exports= mongoose.model('EUD', EuSchema, 'eud')