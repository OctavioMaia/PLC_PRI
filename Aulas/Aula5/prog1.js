var url= require('url')
var endereco = 'http://localhost:7777/default.html?ano=2017&mes=10&dia=16'
var q = url.parse( endereco, true)

console.log(q.host)  // returns 'localhost:7777
console.log(q.pathname) //returns 'default.htm'
console.log(q.search) // returns 'ano=2017&mes=...'

var qdata = q.query //returns an object: 
console.dir(qdata)
console.log(qdata.mes)