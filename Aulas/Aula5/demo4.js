var http = require('http')
var url = require('url')

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    var purl = url.parse(req.url, true)
    var q = purl.query
    var r = parseInt(q.a, 10) + parseInt(q.b, 10)
    var txt = q.a + " + " + q.b + " = " + r
    res.end(txt)
}).listen(7777);