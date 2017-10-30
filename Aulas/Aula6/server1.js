var http = require('http')
var url = require('url')

var myserver = http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type': 'text/html'})
    res.write('<p>Method: ' + req.method + '</p>')
    res.write('<p>URL: ' + req.url + '</p>')
    res.write('<p>Query: ' + JSON.stringify(url.parse(req.url,true).query) + '</p>')
    res.end()
})

myserver.listen('5555')
console.log('Servidor à escuta na porta 5555')