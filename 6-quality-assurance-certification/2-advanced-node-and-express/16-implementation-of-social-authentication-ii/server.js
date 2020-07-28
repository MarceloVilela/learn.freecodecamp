'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const session     = require('express-session');
const mongo       = require('mongodb').MongoClient;
const passport    = require('passport');
//
const cookieParser   = require('cookie-parser');
const GitHubStrategy = require('passport-github').Strategy;

const app = express();

fccTesting(app); //For FCC testing purposes

app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session());

app.set('view engine', 'pug')

mongo.connect(process.env.DATABASE, (err, db) => {
    if(err) {
        console.log('Database error: ' + err);
    } else {
        console.log('Successful database connection');
      
        app.use(session({
          secret: process.env.SESSION_SECRET,
          resave: true,
          saveUninitialized: true,
        }));
        app.use(passport.initialize());
        app.use(passport.session());
      
        function ensureAuthenticated(req, res, next) {
          if (req.session.user || req.isAuthenticated()) {
              return next();
          }
          res.redirect('/login');
        };

        passport.serializeUser((user, done) => {
          done(null, user.id);
        });

        passport.deserializeUser((id, done) => {
            db.collection('socialusers').findOne(
                {id: id},
                (err, doc) => {
                    done(null, doc);
                }
            );
        });

      
        /*
        *  ADD YOUR CODE BELOW
        */
      
        passport.use(new GitHubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: 'https://lfcc-social-authentication.glitch.me/auth/github/callback'
          },
          function(accessToken, refreshToken, profile, cb) {
            console.log(profile.profileUrl)
            return cb(null, profile);
          }
        ));
      
        app.get('/auth/github', passport.authenticate('github'));
      
        app.get('/auth/github/callback', 
          passport.authenticate(
            'github', 
            { 
              failureRedirect: '/login', 
            }
          ),
          function(req, res) {
            req.session.user = req.user;
            res.redirect('/profile');
          }
        );
      
        /*
        *  ADD YOUR CODE ABOVE
        */
      
      
        app.route('/')
          .get((req, res) => {
            res.render(process.cwd() + '/views/pug/index');
          });

        app.get('/profile',
          ensureAuthenticated,
          (req, res) => {
            req.user = req.session.user;
            console.log('profile', req.user);
            res.render(process.cwd() + '/views/pug/profile', {user: req.user});
          }
        );

        app.route('/logout')
          .get((req, res) => {
              req.logout();
              res.redirect('/');
          });

        app.use((req, res, next) => {
          res.status(404)
            .type('text')
            .send('Not Found');
        });
      
        app.listen(process.env.PORT || 3000, () => {
          console.log("Listening on port " + process.env.PORT);
        });  
}});
