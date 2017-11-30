const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')

var app = express()

var db

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    db.collection('tarefas').find().toArray((err,atarefas)=>{
        if(!err){
            res.render('index.ejs',{tarefas: atarefas})
        }else{
            console.log('Erro: '+ err)
            res.send('Erro:'+err)
        }
    })
})

app.post('/tarefa',(req,res) => {
    db.collection('tarefas').save(req.body, (err,resultado)=>{
        if(!err){
            console.log('Registo gravado: ' + resultado)
            res.redirect('/')
        }else{
            console.log('Erro: ' + err)
            res.send('Erro ao gravar na BD...')
        }
    })
})

MongoClient.connect('mongodb://localhost:27017/parafazer', (err,database)=>{
    if(!err){
        db = database
        app.listen(7777, ()=>{
            console.log('Servidor à escuta na porta 7777')
        })
    }else{
        console.log('Erro: falhou a conexão à BD.')
    }
})