var express    = require('express')
var app        = express()
var path       = require("path")
var server     = require('http').createServer(app)
var io         = require('socket.io')(server)
var bodyParser = require('body-parser')
var basicAuth = require('basic-auth')

app.use(bodyParser.json())

var hostname = 'localhost';
var port = process.env.PORT || 3000;

var router = express.Router();

var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
  keyPath: process.env.AWS_IOT_KEY_PATH,
  certPath: process.env.AWS_IOT_CERT_PATH,
  caPath: process.env.AWS_IOT_CA_PATH,
  clientId: process.env.AWS_IOT_CLIENT_ID,
  region: process.env.AWS_REGION,
  reconnectPeriod: 1500
});

router.route('/configure')
.post(function (req, res) {
  console.log(req.body);
  device.publish('mozart', JSON.stringify({
    event: 'config',
    device: req.body.deviceName,
    data: req.body.data
  }));

  res.send('config done!');
});

router.route('/reset')
.post(function (req, res) {
  device.publish('mozart', JSON.stringify({
    event: 'reset'
  }));

  res.send('reset done!');
});

router.route('/arm')
.post(function (req, res) {
  device.publish('mozart', JSON.stringify({
    event: 'arm'
  }));

  res.send('armed sent!');
});

router.route('/start')
.post(function (req, res) {
  device.publish('mozart', JSON.stringify({
    event: 'start',
    duration: req.body.duration
  }));

  res.send('armed sent!');
});

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

var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  };

  var user = basicAuth(req);
  if (user && user.name === 'conductor' && user.pass == 'beethoven') {
    return next();
  } else {
    return unauthorized(res);
  }
};

router.get('/conductor(\.html)?', auth, function (req, res) {
  res.sendFile(path.join(__dirname+'/views/conductor.html'));
});

app.use(router);

app.use('/', express.static(__dirname + '/public'));

server.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});

io.on('connection', (socket) => {
  socket.on('times-up', function() {
    device.publish('mozart', JSON.stringify({ event: 'boom', device: 'symphony-mac' }));
  });
});

device.subscribe('mozart');

var moduleMap = {
  "cello-chip": false,
  "violin-chip": false,
  "trumpet-edison": false
};

device.on("message", function(topic, payload) {
  if(topic === 'mozart') {
    console.log("received message: ", topic, payload.toString());
    payload = JSON.parse(payload);
    if (payload.device == 'symphony-mac') {
      return;
    }

    switch (payload.event) {
      case "boom":
      case "start":
      case "bomb-disarmed":
        io.emit(payload.event, payload);
        break;
      case "reset":
        io.emit(payload.event, payload);
        moduleMap["cello-chip"] = false;
        moduleMap["violin-chip"] = false;
        moduleMap["trumpet-edison"] = false;
        break;
      case "disarmed":
        console.log(payload.device + " Module Disarmed!");
        io.emit(payload.event, payload);
        moduleMap[payload.device] = true;
        checkIfBombDisarmed();
        break;
    }
  }
});

function checkIfBombDisarmed() {
  if (moduleMap["cello-chip"] && moduleMap["violin-chip"] && moduleMap["trumpet-edison"]) {
    device.publish('mozart', JSON.stringify({ event: 'bomb-disarmed' }));
  }
}

function exit() {
  process.exit();
}

process.on('SIGINT', exit);
