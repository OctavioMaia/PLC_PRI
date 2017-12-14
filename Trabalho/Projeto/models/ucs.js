var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CasamentoSchema = new Schema({


})

var PublicacaoSchema = new Schema({
    tipo: {type: String, required: true},
    privacidade: {type: String, required: true},
    titulo: {type: String, required: true},
    data: {type: String, required: true},
    descricao: {type: String, required: true},
    local: {type: String},
	notas: {"oneOf": [
        {}
    ]}
})

var EuSchema = new Schema({
	ident: {type: String, required: true},
	nome: {type: String, required: true},
	idade: {type: String, required: true},
    genero: {type: String, required: true},
    email: {type: String, required: true},
    morada: {type: String, required: true},
    proficao: {type: String, required: true},
    numeroTel: {type: String, required: true},
	publicacoes: [PublicacaoSchema]
})

//Exportações do módulo
module.exports= mongoose.model('UC', UCSchema, 'ucs')