//servidor nodejs do myPara

var http = require('http')
var fs = require('fs')
var qs = require('querystring')

var myserver = http.createServer(function(req,res){
	if(req.method==="GET"){
		console.log('Recebi um pedido da paraBD...')
		fs.readFile('paraBD.json','utf8',function(err, data){
			if(!err){
				res.writeHead(200, {'Content-Type': 'application/json',
									'Access-Control-Allow-Origin': '*'}) //o pedido pode ser feito de qualquer origem
				res.write(data)
				res.end()
			}
			else{
				console.log('Erro na leitura da BD')
				res.writeHead(404, {'Content-Type': 'text/plain'})
				res.end('Erro ao ler a BD.')
			}
		})
	}
	else{// tratamento de pedidos POST
		var requestBody = ''
		req.on('data', function(data){
			requestBody += data
		})
		req.on('end', function(){
			var sentData = qs.parse(requestBody)
			var paras = []
			fs.readFile('paraBD.json','utf8',function(err, data){
			if(!err){
				paras = JSON.parse(data)
				paras.push(sentData)
				console.log('Vou gravar o para: ' + JSON.stringify(sentData))
				fs.writeFile('paraBD.json',JSON.stringify(paras),function(err){
					if(!err){
						res.writeHead(200, {'Content-Type': 'text/plain',
											'Access-Control-Allow-Origin': '*'}) //o pedido pode ser feito de qualquer origem
						res.write('Paragrafo guardado:' + JSON.stringify(sentData))
						res.end()
					}
					else{
						res.writeHead(200, {'Content-Type': 'text/plain',
											'Access-Control-Allow-Origin': '*'}) //o pedido pode ser feito de qualquer origem
						res.end('Erro ao escrever a BD.')
					}
				})
			}
			else{
				console.log('Erro na leitura da BD')
				res.writeHead(404, {'Content-Type': 'text/plain'})
				res.end('Erro ao ler a BD.')
			}
			
		})
		})
	}
})

myserver.listen(7777)
console.log('Servidor à escuta na porta 7777')