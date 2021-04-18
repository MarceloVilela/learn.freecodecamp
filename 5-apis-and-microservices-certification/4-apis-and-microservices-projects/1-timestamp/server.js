// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date_string?", function (req, res) {
  const { date_string } = req.params;

  let date = null;
  let condition = '';

  //2.unix timestamp
  if (!isNaN(date_string)) {
    date = new Date(Number(date_string));
    condition = 'number';
  }
  else if (date_string) {
    date = new Date(date_string);
    condition = 'string';
  }
  //3.date string is empty
  else {
    date = new Date();
    condition = 'string-empty';
  }

  const utc = date.toUTCString();
  const unix = date.getTime();

  //5.date string is invalid
  if (utc === 'Invalid Date') {
    res.json({ error: utc });
  }

  //4.If the date string is valid the api returns
  res.json({ unix, utc, condition });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
