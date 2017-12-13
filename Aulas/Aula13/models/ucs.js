var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AlunoSchema = new Schema({
	numero: {type: String, required: true},
	nome: {type: String, required: true},
	notas: [{ident: String, nota: Number}]
})

var UCSchema = new Schema({
	ident: {type: String, required: true},
	designacao: {type: String, required: true},
	curso: {type: String, required: true},
	anoLetivo: {type: String, required: true},
	alunos: [AlunoSchema]
})

//Exportações do módulo
module.exports= mongoose.model('UC', UCSchema, 'ucs')