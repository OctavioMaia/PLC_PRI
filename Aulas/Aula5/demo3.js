var http = require('http')
var meta = require('./mymod')

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    console.dir(req)
    res.write(req.url)
    res.end()
}).listen(7777);