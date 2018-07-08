const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Users = new Schema({
    username: String,
    email: String,
    password: String
});

Users.methods.validPassword = function( pwd ) {
    // @TODO: decode password
    return ( this.password === pwd );
};

Users.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', Users);