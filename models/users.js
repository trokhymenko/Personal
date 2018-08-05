const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require("bcrypt");

const SALT_LENGTH = 10;

const Users = new Schema({
    username: String,
    email: String,
    password: String
});

Users.methods.validPassword = function(pwd, callback) {
    bcrypt.compare(pwd, this.password, function(err, same) {
        if (err) {
            callback(err);
        }
        callback(null, same);
    });
};

// Crypt password
Users.pre('save', function(next){
    let user = this;
    
    // use bcrypt to generate a salt
    bcrypt.genSalt(SALT_LENGTH, function(err, salt) {
        
        if (err) {
            console.log("error salt");
            return next(err);
        }

        // using the generated salt, use bcrypt to generate a hash of the password
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }

            // store the password hash as the password
            user.password = hash;
            next();
        });
    });
});


Users.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', Users);