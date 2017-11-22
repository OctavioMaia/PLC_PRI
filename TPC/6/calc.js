var http = require('http')
var url = require('url')
var fs = require('fs')
var qs = require('querystring')

var myserver = http.createServer(function (req,res){
    var prevResult=0;
    if(req.method === "GET"){
        if(req.url === '/in') {
            fs.readFile('calc.html', function(err, data){
                if(err) {
                    res.writeHead(404, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.end("Erro 404 NOT FOUND!")
                }
                else {
                    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write("<p>O resultado é: " + prevResult + " </p>")
                    res.write(data)
                    res.end()
                }
            })
        }
        else if(req.url.startsWith('/calc')){
            var q = url.parse(req.url, true).query
            var op1 = q.op1
            var op2 = q.op2
            var op = q.op
            prevResult = eval(op1 + op + op2)
            fs.readFile('calc.html', function(err, data){
                if(err) {
                    res.writeHead(404, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.end("Erro 404 NOT FOUND!")
                }
                else {
                    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
                    res.write("<p>O resultado é: " + prevResult + " </p>")
                    res.write(data)
                    res.end()
                }
            })
        }
        else {
            res.writeHead(404, {'Content-Type' : 'text/html; charset=utf-8'})
            res.end("404 " + req.url + "não está disponivel!")
        }
    } 
    else if (req.method === 'POST') {
        if (req.url.startsWith('/calc')) {
            var requestBody = ''
            req.on('data', function (data) {
                requestBody += data
                if(requestBody.legnht > 1e7){
                    res.writeHead(413, 'Request Entity Too Large', {'Content-Type':'text/html; charset=utf-8'})
                    res.end('<!doctype html><html><head><meta charset="utf-8"/><title>413</title></head><body><h1>413</h1><h3>Request Entity Too Large</h3></body></html>')
                }
            })
            req.on('end', function (){
                var formData = qs.parse(requestBody)
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                prevResult = eval(formData.op1 + formData.op + formData.op2)
                res.write("<p>O resultado é: " + prevResult + " </p>")
                fs.readFile('calc.html', function (err, data) {
                    if (err) {
                        res.end("404 calc.html não foi encontrado!")
                    }
                    else {
                        res.write(data)
                        res.end()
                    }
                })
            })
        }
        else{
            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
            res.end("404 " + req.url + " não está disponivel!")
        }
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end("404 " + req.method + " não suportado!")
    }
}).listen('4444')
console.log('Servidor à escuta na porta 4444')