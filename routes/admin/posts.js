var Posts = require('../../models/posts'),
    async = require('async');

// Posts page
function get_posts(req, res) {
    let perPage = 10;
    let page = req.query.page || 1;
    let skip = (perPage * page) - perPage;

    Posts.find({}, null, {skip: skip, limit: perPage}, function(err, posts) {
        if (err) {
            console.log(err);
        }
        let postMap = [];
        posts.forEach(function(post) {
            postMap.push({
              'id': post._id,
              'title': post.title,
            });
        });

        Posts.count(function(err, count) {
            res.render('admin/pages/posts', { title: 'Posts', posts: postMap, current: page, pages: Math.ceil(count / perPage), messages: req.flash() }); 
        });
    });
}

//Add or edit post
function edit_post(req, res) {
    var data = {
        action: req.url
    };

    if (req.params.postid) {

        console.log(req.method);

        if (req.method === 'POST') {
            Posts.findByIdAndUpdate(req.params.postid, {
                title: req.body.title,
                content: req.body.content
            }, {new: true}, function(err, post) {
                if (err) {
                    req.flash('error', 'Error!');
                    res.redirect('/admin/posts');
                    return;
                }

                req.flash('success', 'Saved!');
                data.item = post;
                res.render('admin/pages/edit-post', { title: 'Posts', data: data, messages: req.flash() }); 
            })
        }
        if (req.method === 'GET') {
            Posts.findById(req.params.postid, function(err, item) {
                if (err) {
                    req.flash('error', 'Error!');
                    res.redirect('/admin/posts');
                    return;
                }
                
                data.item = item;
                res.render('admin/pages/edit-post', { title: 'Posts', data: data, messages: req.flash() }); 
            });
        }
        

    } else {
        if (req.body.title) {

            Posts.create({
                title: req.body.title,
                content: req.body.content
            }, function (err, small) {
                if (err) {
                    req.flash('error', 'Not Create Post!');
                    resp.redirect('/admin/post/add');
                    //res.render('admin/pages/edit-post', { title: 'Posts', options: options, messages: req.flash() }); 
                }
                // saved!
                req.flash('success', 'Saved!');
                res.redirect('/admin/post/add');
            });

        } else {
            res.render('admin/pages/edit-post', { title: 'Posts', data: data, messages: req.flash() });
        }
    }    
}

// Delete Post
function delete_post(req, res) {
    if (req.params.postid) {
        Posts.findByIdAndRemove(req.params.postid, function(err, item) {
            if (err) {
                req.flash('error', 'Error!'); 
                res.redirect('/admin/posts');  
            } else {
                req.flash('error', 'Deleted!'); 
                res.redirect('/admin/posts');  
            }       
        });
    }
}

//==============================================================================
/**
* Export module
*/
module.exports = {
    page: get_posts,
    edit: edit_post,
    delete: delete_post
};
//==============================================================================