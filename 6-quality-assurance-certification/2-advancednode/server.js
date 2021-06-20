'use strict';
require('dotenv').config();
const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const passport = require('passport');
const io = require('socket.io')(http);
const passportSocketIo = require('passport.socketio');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');

const auth = require('./auth');
const routes = require('./routes');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');

fccTesting(app); //For FCC testing purposes
const URI = process.env.MONGO_URI;
const store = new MongoStore({ url: URI });
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
  key: 'express.sid',
  store: store
}));
app.use(passport.initialize());
app.use(passport.session());

io.use(
  passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: 'express.sid',
    secret: process.env.SESSION_SECRET,
    store: store,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail
  })
);

myDB(async client => {
  const myDataBase = await client.db('database').collection('users');
  const db = await client.db('database');

  console.log(db.collection);

  auth(app, db);
  routes(app, db);

  let currentUsers = 0;

  io.on('connection', socket => {
    console.log('A user has connected');
    console.log('user ' + socket.request.user.name + ' connected', socket.request.user);
    ++currentUsers;

    socket.on('chat message', (message) => {
      io.emit('chat message', { name: socket.request.user.name, message });
    });

    io.emit('user', {
      name: socket.request.user.name,
      currentUsers,
      connected: true
    });
  });

  io.on('disconnect', () => {
    --currentUsers
    //socket.emit('user count', currentUsers)
    io.emit('user', {
      name: socket.request.user.name,
      currentUsers,
      connected: true
    });
  });

  http.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port ' + process.env.PORT);
  });
}).catch(e => {
  app.route('/').get((req, res) => {
    res.render('pug', { title: e, message: 'Unable to login' });
  });
});


function onAuthorizeSuccess(data, accept) {
  console.log('successful connection to socket.io');

  accept(null, true);
}

function onAuthorizeFail(data, message, error, accept) {
  if (error) throw new Error(message);
  console.log('failed connection to socket.io:', message);
  accept(null, false);
}
