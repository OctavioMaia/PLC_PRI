// Servidor das teses
var http = require('http')
var fs = require('fs')
var pug = require('pug')
var formidable = require('formidable')

// Compular a template das paginas numa funcao
const formTese = pug.compileFile('form-tese2.pug')
const teseRecebida = pug.compileFile('tese-recebida.pug')

var myserver = http.createServer(function(req,res){
    if(req.method==='GET'){
        if(req.url === "/registo"){
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(formTese())
            res.end()
        }
        else{
            res.writeHead(404, {'Content-Type': 'text/plain'})
            res.end('404 ' + req.url + ' não está disponível.')
        }
    }
    else if(req.method==='POST'){
        if(req.url === '/processaForm'){
            var form = new formidable.IncomingForm()
            form.parse(req, function(err,fields,files){
                if(!err){
                    var fenviado = files.ficheiro.path
                    var fnovo = './uploaded/'+files.ficheiro.name
                    
                    fs.rename(fenviado,fnovo, function(err){
                        if(!err){
                            fields.status="Ficheiro recebido e guardado com sucesso."
                        }
                        else{
                            fields.status="Ocorreram erros na gravação do ficheiro enviado."
                        }
                    })

                    res.writeHead(200, {'Content-Type': 'text/html'})
                    fields.ficheiro = files.ficheiro.name
                    res.write(teseRecebida(fields))
                    console.log(JSON.stringify(fields))
                    console.log(JSON.stringify(files))
                    res.end()
                }
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