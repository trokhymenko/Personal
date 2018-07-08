var Users = require('../../models/users'),
    async = require('async');

// Users page
function getUsersPage(req, res, next) {

    // var Options = {};
    // async.parallel({
    //     one: function(callback) {
    //         setTimeout(function() {
    //             console.log(1);
    //             Ses.one = '1';
    //             callback(null, 'one');
    //         }, 200);
    //     },
    //     two: function(callback) {
    //         setTimeout(function() {
    //             console.log(2);
    //             Ses.two = '2';
    //             callback(null, 'two');
    //         }, 100);
    //     },
    //     tree: function(callback) {
    //         setTimeout(function() {
    //             console.log(3);
    //             Ses.tree = '3';
    //             callback(null, 'tree');
    //         }, 100);
    //     }
    // },
    // // optional callback
    // function(err, results) {
    //     console.log(err);
    //     console.log(results);
    // });

    let perPage = 10;
    let page = req.query.page || 1;
    let skip = (perPage * page) - perPage;

    Users.find({}, null, {skip: skip, limit: perPage}, function(err, users) {
        var userMap = [];
        users.forEach(function(user) {
          userMap.push({
              'id': user._id,
              'username': user.username,
              'email': user.email,
          });
        });

        Users.count(function(err, count) {
            res.render('admin/pages/users', { title: 'Users', users: userMap, current: page, pages: Math.ceil(count / perPage), messages: req.flash() }); 
        });
    });
}
//==============================================================================
/**
* Export module
*/
module.exports = {
    page: getUsersPage,
};
//==============================================================================