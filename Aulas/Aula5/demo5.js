var http = require('http')
var fs = require('fs')

http.createServer(function (req, res) {
    fs.readFile('sample1.html',function(err,data){
        if(!err){
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            res.end()     
        }
        else
            res.end('Erro na leitura do ficheiro.')
    })
}).listen(7777);