const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Posts = new Schema({
    title: String,
    content: String,
    author: String
});

module.exports = mongoose.model('posts', Posts);