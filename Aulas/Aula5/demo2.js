var http = require('http')
var meta = require('./mymod')

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.write('Criada com o node.js por ' + meta.myName() + " em " +meta.myDateTime())
    res.end()
}).listen(7777);