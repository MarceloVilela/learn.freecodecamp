var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const logger = function(req,res,next){
  //const {method,path,ip} = req;
  const log = req.method + " " + req.path + " - " + req.ip;
  console.log(log);
  next();
};

// 1) Meet the node console.
console.log("Hello World");

// 2) A first working Express Server
app.get('/', function(req, res){
  //res.send('Hello Express');
  // 3) Serve an HTML file
  res.sendFile(__dirname + '/views/index.html');
});

// 4) Serve static assets  */
app.use('/public', express.static(__dirname + '/public'));

// 5) Serve JSON
app.get('/json', function(req,res){
  // 6) Use the .env
  const message = 'Hello json';
  const messageFormatted = process.env.MESSAGE_STYLE === 'uppercase'
    ? message.toUpperCase()
    : message;
  res.json({message: messageFormatted});
});

// 7) Implement a Root-Level Request Logger Middleware
app.use(logger);

// 8) Chain Middleware to Create a Time Server
const timmer = function(req,res,next){
  req.time = new Date().toString();
  next();
};

app.get('/now', timmer, function(req,res){
  res.json({time: req.time});
});

// 9) Get Route Parameter Input from the Client
app.get('/:word/echo', function(req,res){
  const {word} = req.params;
  res.json({echo: word});
});

// 10) Get Query Parameter Input from the Client
app.get('/name', function(req,res){
  const {first, last} = req.query;
  res.json({name: `${first} ${last}`});
})

// 11) Use body-parser to Parse POST Requests
app.use(
  bodyParser.urlencoded({extended: false})
);

// 12) Get Data from POST Requests
var bodyHandler = function(req,res){
  res.json({name: `${req.body.first} ${req.body.last}`})
}
app.route('/name')
.get(bodyHandler)
.post(bodyHandler)

module.exports = app;
