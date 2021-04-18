require('dotenv').config();
const express = require('express');
const cors = require('cors');
//
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var dns = require('dns');

const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

// create application/json parser
//app.use(express.json());
app.use(bodyParser.json());
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

//
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
autoIncrement.initialize(mongoose.connection);

var Schema = mongoose.Schema;
var ShortUrlSchema = new Schema({
  url: { type: String, index: true, unique: true },
  //shortId: Number
});

ShortUrlSchema.plugin(autoIncrement.plugin, 'ShortUrl');
var ShortUrl = mongoose.model('ShortUrl', ShortUrlSchema);

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/list", function (req, res) {
  ShortUrl.find().exec((err, data) => res.json(data))
  //ShortUrl.remove({}, (err,data)=>res.json({}))
});

//1.I can POST a URL to
app.post("/api/shorturl", function (req, res) {
  const { url } = req.body
  let myURL = ''
  try {
    myURL = new URL(url)
    if (!url.match(/https?:\/\//)) {
      throw new Error('invalid url');
    }
  }
  catch (_) {
    return res.json({ error: 'invalid url' });
  }
  const hostname = myURL.hostname
  const options = {
    all: true,
    //family: 6,
    //hints: dns.ADDRCONFIG | dns.V4MAPPED
  }

  const done = (err, short) => {
    typeof short !== 'undefined'
      ? res.json({
        original_url: url, //hostname
        short_url: short._id
      })
      : res.json({
        error: 'duplicated URL'
      })
  }

  const createAndSaveShortUrl = (done, params) => {
    const shortUrl = new ShortUrl({ url: params.url });
    const data = shortUrl.save((err, short) => done(err, short))
  }

  dns.lookup(hostname, options, (err, addresses, family) => {
    addresses && addresses.length > 0 && ('address' in addresses[0])
      ? createAndSaveShortUrl(done, { url })
      : res.json({ error: 'invalid url' })
  })
});

//3.When I visit the shortened URL, it will redirect me to my original link.
app.get("/api/shorturl/:id", function (req, res) {
  const { id } = req.params;

  const done = (err, short) => {
    typeof short !== 'undefined' && short
      ? res.redirect(short.url)
      : res.json({ error: err })
  }

  const findUrlById = function (_id, done) {
    ShortUrl.findById({ _id })
      .exec((err, data) => done(err, data))
  }

  findUrlById(id, done)
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
