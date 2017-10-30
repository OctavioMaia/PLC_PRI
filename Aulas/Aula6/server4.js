var http = require('http')
var url = require('url')
var qs = require('querystring')
var fs = require('fs')

var myserver = http.createServer(function(req,res){
	if(req.method === "GET"){
		if(req.url === '/registo') {
			fs.readFile('primeiro.html',function(err,data){
				if(err){
					res.writeHead(404,{'Content-Type':'text/html'})	
					res.end("404 primeiro.html not found")
				}
				else{
					res.writeHead(200,{'Content-Type':'text/html'})	
					res.write(data)
					res.end()
				}
					
			})
		}
		else if(req.url.startsWith('/processaForm')){
				res.writeHead(200,{'Content-Type':'application/json'})	
				
				var q = url.parse(req.url,true).query
				
				res.write(JSON.stringify(q))
				res.end()
		}
		else{
			res.writeHead(404,{'Content-Type':'text/html'})
			res.end("404 "+req.url+" not found")
		}
	}
	else if (req.method === "POST"){
		if(req.url.startsWith('/processaForm')){
			var requestBody = ''
			req.on('data', function(data){
				requestBody += data
				if(requestBody.length > 1e7){
					res.writeHead(413,'Request Entity Too Large',{'Content-Type':'text/html'})
					res.end("413 ENTITY TOO LARGE")
				}
			})
			req.on('end',function(){
				var formData = qs.parse(requestBody)
				res.writeHead(200,{'Content-Type':'application/json'})
				res.write(JSON.stringify(formData))
				res.end()
			})
		}
		else {
			res.writeHead(404,{'Content-Type':'text/html'})
			res.end("404 "+req.url+" not available")
		}
	}
	else {
		res.writeHead(404,{'Content-Type':'text/html'})
		res.end("404 "+req.method+" not supported")
	}
})


myserver.listen('5555')
console.log('Servidor à escuta na porta 5555...')