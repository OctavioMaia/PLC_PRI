var http = require('http')
var pug = require('pug')
var fs = require('fs')
var qs = require('querystring')
var formidable = require('formidable')

const formTese = pug.compileFile('form-pr.pug')
const teseRecebida = pug.compileFile('pr-recebido.pug')

var myserver = http.createServer(function(req,res){
	if(req.method === "GET") {
		if(req.url === "/envio"){
			res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
			res.write(formTese())
			res.end();
		}
		else{
			res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'})
			res.end('404 ' + req.url + ' não está disponivel!')
		}
	}
	else if (req.method === "POST") {
        if(req.url === "/processaForm") {
			var list = []
            var form = new formidable.IncomingForm()
            form.parse(req, function(err, fields, files){
                if(!err) {
                	for(const f of Object.keys(files)){
                		var fenviado = files[f].path
						var fnovo = './uploaded/' + files[f].name
						console.log('Uploaded: '+fnovo)
	                    fs.rename(fenviado, fnovo, function(err){
	                        if(!err) {
	                            fields.status = "Ficheiro recebido e guardado com sucesso."
	                        }
	                        else {
	                            fields.status = "Ocorreram erros na gravação do ficheiro enviado"
	                        }
	                    })
						fields[f] = files[f].name
						list.push(files[f].name)
						fields.list = list
					}
					res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(teseRecebida(fields))
                    res.end()
                }
            })
        }
        else {
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'})
            res.end('404 '+req.url+' não está disponível!')
        }
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'})
        res.end('404 '+req.method+' - Não é suportado!')
    }
}).listen(3333)
console.log('Servidor à escuta na porta 3333')
