var express = require('express');
var router = express.Router();
var UC = require('../models/ucs')

//lista UCs
router.get('/', function(req, res, next) {
    UC
        .find()
        .sort({anoLetivo: -1})
        .exec((err, doc)=>{
            if(!err)
                res.render('showUCs', {luc: doc})
            else
                res.render('error', {error: err})
        })
});

//lista uma UC
router.get('/uc/:id', (req,res,next)=>{
    UC
        .findOne({ident: req.params.id})
        .exec((err,doc)=>{
            if(!err)
                res.render('showUC', {uc:doc})
            else
                res.render('error', {error:err})
        })
})

//POST Adiciona UC
router.post('/uc', (req, res, next)=>{
	var nova = new UC({ident: req.body.ident, 
					   designacao: req.body.designacao,
					   curso: req.body.curso,
					   anoLetivo: req.body.anoLetivo,
					   alunos: []})
	nova.save((err,resultado)=>{
        if(!err) 
            console.log('Acrescentei um curos ' + req.body.ident)
        else 
            console.log('Erro: '+err)
	})
	res.redirect('/ucs')
})

//POST Adiciona um Aluno
router.post('uc/:idUc/aluno', (req,res,next)=>{
    var novo = {numero: req.body.numero, nome: req.body.nome, notas: []}
    UC.update({ident: req.params.idUc}, {$push: {alunos: novo}}, (err, resultado)=>{
        if(!err)
            console.log('Acrescentei um aluno: ' + req.body.nome)
        else
            console.log('Erro: ' + err)
    })
    res.redirect('/ucs/uc/' + req.params.idUc)
})

module.exports = router;