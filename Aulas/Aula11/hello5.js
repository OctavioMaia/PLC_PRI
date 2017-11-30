const express = require('express')
const app = express()

app.use(function(res,req,next){
    var d = new Date
    console.log('Hora: ', d.toISOString())
    next()
})

app.use('/user/:id', function(req,res,next){
    console.log('ID:', req.params.id)
    next()
    }, function(req,res,next){
        res.send('User Info')
})

app.get('/user/:id',function(req,res,next){
    res.end(req.params.id)
})

app.listen(3000, () => console.log('Servidor à escuta na porta 3000!'))