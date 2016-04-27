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
    res.end('5 minutes countdown starts now');
  });

router.route('/countdown/:minutes')
  .all(function(req,res,next) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    next();
  })
  .get(function(req,res,next){
    io.emit('countdown', { message: 'start count down', duration: parseInt(req.params.minutes, 10) })
    res.end(req.params.minutes + ' minutes countdown starts now');
  });

app.use(router);

app.use('/', express.static(__dirname + '/public'));

server.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});

io.on('connection', (socket) => {

})

var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
  keyPath: '/Users/jigishchawda/.symphony-mac/private.pem.key',
  certPath: '/Users/jigishchawda/.symphony-mac/certificate.pem.crt',
  caPath: '/Users/jigishchawda/.symphony-mac/root-CA.pem',
  clientId: 'symphony-mac',
  region: 'ap-southeast-1',
  reconnectPeriod: 5000
});

device.subscribe('mozart');
device.on("message", function(topic, payload) {
  if(topic === 'mozart') {
    console.log("received message: ", topic, payload.toString());
    payload = JSON.parse(payload);
    io.emit(payload.event, payload);
  }

});

// device.publish('symphony', JSON.stringify({ event: 'just checking' }));


function exit() {
  process.exit();
}

process.on('SIGINT', exit);
