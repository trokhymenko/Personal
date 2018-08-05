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

            user.validPassword(password, function(err, isValid) {
                if (err) {
                    return done(err);
                }

                if (isValid) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: "Invalid password"
                    });
                }
            });
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
