var Users = require('../../models/users'),
    async = require('async');

// Users page
function addNewUser(req, res, next) {

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

    // Users.find({}, function(err, users) {
    //     var userMap = [];
    //     users.forEach(function(user) {
    //       userMap.push({
    //           'id': user._id,
    //           'email': user.email,
    //       });
    //     });
   
    //     res.render('admin/pages/users', { title: 'Users', users: userMap }); 
    // });

    // Users.create({ size: 'small' }, function (err, small) {
    //     if (err) return handleError(err);
    //     // saved!
    //   });

    async.waterfall([
        function(callback) {
            Users.find({email: req.body.email}, function(err, users) {
                if (err) {
                    callback(err, null);
                }

                callback(null, users.length);
            });   
        },
        function(count_users, callback) {
            if (count_users == 0) {
                Users.create({
                    username: req.body.username,
                    email: req.body.email, 
                    password: req.body.password 
                }, function (err, small) {
                    if (err) callback(err, 'error save');
                    // saved!
                    callback(null, small);
                });
            } else {
                callback(null, 'error');
            }
        },
    ], function (err, result) {
        // result now equals 'done'
        res.setHeader('Content-Type', 'application/json');

        if (err) {
            res.send(JSON.stringify({status: 'error'}));
        }

        if (result === 'error') {
            res.send(JSON.stringify({status: 'error'}));
        }
        
        res.send(JSON.stringify({status: 'success'}));
    });

    
}

/**
 * Delete User from DB
 */
function deleteUser(req, res, next) {
    Users.findByIdAndRemove(req.body.userid, function(err, user) {
        console.log(err);
        console.log(user);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({status: 'success'}));
    });
}

//==============================================================================
/**
* Export module
*/
module.exports = {
    add: addNewUser,
    delete: deleteUser
};
//==============================================================================