var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    age: {type: String, required: false},
    gender: {type: String, required: false},
    address: {type: String, required: false},
    profession: {type: String, required: false},
    cnumber: {type: String, required: false}
})

module.exports = mongoose.model('User', UserSchema, 'users')