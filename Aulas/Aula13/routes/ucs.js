var express = require('express');
var router = express.Router();
var UC = require('../models/ucs');

//Lista Ucs
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

//GET Lista uma UC
router.get('/uc/:id', (req, res, next)=>{
    UC
        .findOne({ident: req.params.id})
        .exec((err, doc)=>{
            if(!err) res.render('showUC', {uc:doc})
            else res.render('error', {error:err})
        })
})

//GET Lista um Aluno
router.get('/uc/:idUC/aluno/:idAluno', (req, res, next)=>{
    UC
        .findOne({ident: req.params.idUc})
        .exec((err, doc)=>{
            if(!err){
				var aluno = doc.alunos.filter(a => a.numero == req.params.idAluno)
				aluno[0].curso = req.params.idUc 
				res.render('showAluno', {a: aluno[0]})
				
			}
            else res.render('error', {error:err})
        })
})


//POST Adiciona UC
router.post('/uc', (req, res, next)=>{
    var nova = new UC({ident: req.body.ident, 
                       designacao: req.body.designacao,
                       curso: req.body.curso,
                       anoLetivo: req.body.anoLetivo,
                       alunos: []})
    nova.save((err, resultado)=>{
        if(!err) console.log('Acrescentei um curso: ' + req.body.ident)
        else console.log('Erro '+ err)
    })
    res.redirect('/ucs/' + req.body.ident)
})

// POST Adiciona  aluno
router.post('/uc/:idUc/aluno', (req, res, next)=>{
    var novo = { numero: req.body.numero, nome: req.body.nome, notas: []}
    UC.update({ident: req.params.idUc}, {$push: {alunos: novo}}, (err, result)=>{
        if(!err) console.log('Acrescentei um aluno: ' + req.body.nome)
        else console.log('Erro ' + err)
    })
    res.redirect('/ucs/uc/' + req.params.idUc)
})

// POST Adiciona nota a aluno
router.post('/uc/:idUc/aluno/:idAluno/nota', (req, res, next)=>{
    var nova = { ident: req.body.ident, nota: req.body.nota}
    UC.update({ident: req.params.idUc, "alunos.numero": req.params.idAluno},
        {$push: {"alunos.$.notas": nova}}, (err, result)=>{
        if(!err) console.log('Acrescentei uma nota.')
        else console.log('Erro ' + err)
    })
    res.redirect('/ucs/uc/' + req.params.idUc + '/aluno/' + req.params.idAluno)
})

//exportações do módulo
module.exports = router;