const express = require('express')
const app = express()

app.use(function(res,req,next){
    var d = new Date
    console.log('Hora: ', d.toISOString())
    next()
})

app.get('/user/:id', function(req,res,next){
    //if the user ID is 0, skip to the next route
    if(req.params.id === '0') 
        next('route')
    else //otherwise pass the control to the next middleware function in this stack
        next()
    }, function(req,res,next){
    res.send('normal')
})

//handler for the /user/:id path, which renders a special page
app.get('/user/:id',function(req,res,next){
    res.send('especial')
})

app.listen(3000, () => console.log('Servidor à escuta na porta 3000!'))