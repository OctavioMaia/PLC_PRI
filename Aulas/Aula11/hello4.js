const express = require('express')
const app = express()

app.use(function(res,req,next){
    var d = new Date
    console.log('Hora: ', d.toISOString())
    next()
})

app.use('/user/:id', function(req,res,next){
    console.log('Request URL:', req.originalUrl)
    next()
    }, function(req,res,next){
        console.log('Request Type:', req.method)
        next()
})

app.get('/',(req,res)  => {
    console.log('Olá!')
    res.send('Olá!')
})

app.listen(3000, () => console.log('Servidor à escuta na porta 3000!'))