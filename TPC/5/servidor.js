var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer(function (req, res) {
    var q = url.parse(req.url, true)
    var number = q.pathname.substring(1)
    console.log("Lendo sample " + number)
    fs.readFile('website/'+number+'.html',function(err,data){
        if(!err){
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            res.end()     
        }
        else
            res.end('Erro na leitura do ficheiro.')
    })
}).listen(7777);