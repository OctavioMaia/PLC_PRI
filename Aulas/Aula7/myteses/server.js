// Servidor das teses
var http = require('http')
var pug = require('pug')
var qs = require('querystring')

// Compular a template das paginas numa funcao
const formTese = pug.compileFile('form-tese.pug')
const teseRecebida = pug.compileFile('tese-recebida.pug')

var myserver = http.createServer(function(req,res){
    if(req.method==='GET'){
        if(req.url === "/registo"){
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(formTese())
            res.end()
        }
        else{
            res.writeHead(404, {'Content-Type': 'text/html'})
            res.end('404 ' + req.url + ' não está disponível.')
        }
    }
    else if(req.method==='POST'){
        if(req.url === '/processaForm'){
            var requestBody = ''
            req.on('data', function(data){
                requestBody+=data
            })
            req.on('end', function(){
                var formData = qs.parse(requestBody)
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(teseRecebida(formData))
                console.log(JSON.stringify(formData))
                res.end()
            })
        }
        else{
            res.writeHead(404, {'Content-Type': 'text/plain'})
            res.end('404 ' + req.url + ' não é suportado.')   
        }
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.end('404 ' + req.method + ' não é suportado.')
    }
})

myserver.listen(3333)
console.log('Servidor à escuta na porta 3333...')