var express = require('express');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();


var router = express.Router();

router.use(bodyParser.json());

router.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Hello World!');
});

router.route('/:minutes')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('hello world: minutes:  ' + req.params.minutes +'!');
})
;

app.use('/go',router);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});