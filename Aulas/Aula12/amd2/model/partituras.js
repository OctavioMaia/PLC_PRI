var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PartituraSchema = new Schema(
	{
		obra: {type: String, required: true, max:100},
		tipo: {type: String, required: true, max:100},
		voz: {type: String},
		clave: {type: String},
		afinacao: {type: String},
		path: {type: String, required: true}
	}
);

//Export model
module.exports = mongoose.model('Partitura', PartituraSchema);