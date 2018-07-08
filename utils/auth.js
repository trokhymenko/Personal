var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Users = require('../models/users');

module.exports.init = () => {
    
    // passport config
   
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      function(req, email, password, done) {
        Users.findOne({ email: email }, function(err, user) {
            if (err) { 
                console.log('error local strategy');
                return done(err); 
            }
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }

            if (!user.validPassword(password)) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
          });
      }
    ));

    passport.serializeUser(function(user, cb) {
        cb(null, JSON.stringify(user));
    });
    
    passport.deserializeUser(function(packet, cb) {
        cb(null,JSON.parse(packet));
    });
};
