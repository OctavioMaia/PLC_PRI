var http = require('http')
var url = require('url')
var fs = require('fs')

var myserver = http.createServer(function(req,res){
    if(req.url === '/registo'){
        
        fs.readFile('form1.html', function(err,data){
            if(err){
                res.writeHead(404,{'Content-Type': 'text/html'})
                res.end("404 form1.html não foi encontrado")
            }
            else{
                res.writeHead(200,{'Content-Type': 'text/html'})
                res.write(data)
                res.end()
            }
        })
    }
    else if(req.url.startsWith('/processaForm')){
        res.writeHead(200,{'Content-Type': 'application/json; charset=utf-8'})

        var q = url.parse(req.url, true).query

        res.write(JSON.stringify(q))
        res.end()
    }
    else{
        res.writeHead(404,{'Content-Type': 'text/html'})
        res.end("404" + req.url + " não está disponivel")    
    }
})

myserver.listen('5555')
console.log('Servidor à escuta na porta 5555')