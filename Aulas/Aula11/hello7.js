const express = require('express')
var app = express()
var router = express.Router()

router.use('/user/:id', function(req,res,next){
    console.log('Request URL:',req.originalUrl)
    next()
}, function(req,res,next){
    console.log('Request Type:', req.method)
    next()
})

router.get('/user/:id',function(req,res,next){
    if(req.params.id === '0') 
        next('route')
    else //otherwise pass the control to the next middleware function in this stack
        next()
    }, function(req,res,next){
    res.send('regular')
})

router.get('/user/:id',function(req,res,next){
    console.log(req.params.id)
    res.send('special')
})

app.use('/',router)

app.listen(3000, () => console.log('Servidor à escuta na porta 3000!'))