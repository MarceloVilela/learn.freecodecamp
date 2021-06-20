const passport = require('passport');
const LocalStrategy = require('passport-local');
const GitHubStrategy = require('passport-github').Strategy;
const session = require('express-session');
const bcrypt = require('bcrypt');
const ObjectID = require('mongodb').ObjectID;

module.exports = function (app, myDataBase) {

  passport.serializeUser((user, done) => {
    console.log("serialize" + user._id);
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    console.log("deserialize" + id);
    myDataBase.collection('socialusers').findOne(
      { _id: new ObjectID(id) },
      (err, doc) => {
        if (err) {
          console.log("deserialize-err-", err);
          return done(err)
        }
        console.log("deserialize-ok-", doc);
        return done(null, doc)
      }
    )
  });

  passport.use(new LocalStrategy(
    function (username, password, done) {
      myDataBase.findOne({ username: username }, function (err, user) {
        console.log('User ' + username + ' attempted to log in.');
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  ));

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.API_URL}/auth/github/callback`
  },
    function (accessToken, refreshToken, profile, cb) {
      console.log("strategy");
      myDataBase.collection('socialusers').findOneAndUpdate(
        { id: profile.id },
        {
          $set: {
            id: profile.id,
            name: profile.displayName || 'John Doe',
            photo: profile.photos[0].value || '',
            //email: profile.emails[0].value || 'No public email',
            created_on: new Date(),
            provider: profile.provider || ''
          }, $set: {
            last_login: new Date()
          }, $inc: {
            login_count: 1
          }
        },
        { upsert: true, new: true },
        (err, doc) => {
          return cb(null, doc.value);
        }
      )
    }
  ));

}