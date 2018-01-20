// load the things we need
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


var PostSchema = new Schema({
    posts : {type:Object}
})

module.exports = mongoose.model('Post', PostSchema, 'posts');