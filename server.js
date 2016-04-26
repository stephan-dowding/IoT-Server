var express = require('express');
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)

var hostname = 'localhost';
var port = 3000;

var router = express.Router();

router.route('/countdown')
  .all(function(req,res,next) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    next();
  })
  .get(function(req,res,next){
    io.emit('countdown', { message: 'start count down!', duration: 5 });
    res.end('Hello World!');
  });

router.route('/countdown/:minutes')
  .all(function(req,res,next) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    next();
  })
  .get(function(req,res,next){
    io.emit('countdown', { message: 'start count down', duration: parseInt(req.params.minutes, 10) })
    res.end('hello world: minutes:  ' + req.params.minutes +'!');
  });

app.use(router);

app.use('/', express.static(__dirname + '/public'));

server.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});

io.on('connection', (socket) => {

})
