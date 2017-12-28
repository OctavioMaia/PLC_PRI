var mongoose = require('mongoose')
var Schema = mongoose.Schema

var RegistoDesportivoSchema = new Schema({
    desporto: {type: String, required: true},
    duracao: {type: String, required: false},
    ficheirogpx: {type: String, required: true},
    participantes: {type: [String], required: true},
    resultado: {type: String, required: true}
})

var AlbumFotografiasSchema = new Schema({
    titulo_album: {type: String, required: true},
    album: [FotografiaSchema]
})

var FotografiaSchema = new Schema({
    path: {type: String, required: true}
})

var RegistoFormacaoSchema = new Schema({
    duracao: {type: String, required:false},
    creditacao: {type: String, required: true}
})

var EventoCientificoSchema = new Schema({
    ficheiros: {type: [String], required: true}
})

var PensamentoSchema = new Schema({
    pal_chaves: {type: [String], required: true}
})

var IdeiaSchema = new Schema({
    pal_chaves: {type: [String], required: true},
    prioridade: {type: String, required: true}
})

var ReceitaSchema = new Schema({
    ingredientes: {type: [String], required: true}
})

var NascimentoSchema = new Schema({
    nome_crianca: {type: String, required: true},
    sexo_crianca: {type: String, required: true},
    pais: {type: [String], required: true}
})

var CasamentoSchema = new Schema({
    noivos: {type: [String], required: true},
    convidados: {type: [String], required: true},
    ementa: {type: [String], required: false}
})

var EventoSchema = new Schema({
    ident: {type: String, required: true},
    local: {type: String, required: false},
    privacidade: {type: String, required: true},
    titulo: {type: String, required: true},
    data: {type: String, required: true},
    descricao: {type: String, required: true},
    tipo: {type: String, required: true},
	notas: {"oneOf": [  
        {casamento: CasamentoSchema},
        {receita: ReceitaSchema},
        {nascimento: NascimentoSchema},
        {pensamento: PensamentoSchema},
        {ideia: IdeiaSchema},
        {eventoCientifico: EventoCientificoSchema},
        {formacao: RegistoFormacaoSchema},
        {fotografia: FotografiaSchema},
        {albumFotografia: AlbumFotografiasSchema},
        {registoDesportivo: RegistoDesportivoSchema}
    ]}
})

var EuSchema = new Schema({
	ident: {type: String, required: true},
	nome: {type: String, required: true},
	idade: {type: String, required: true},
    genero: {type: String, required: true},
    email: {type: String, required: true},
    morada: {type: String, required: true},
    profissao: {type: String, required: true},
    numeroTel: {type: String, required: true},
	publicacoes: [EventoSchema]
})

//Exportações do módulo
module.exports= mongoose.model('EUD', EuSchema, 'eud')