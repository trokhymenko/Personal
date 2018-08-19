var Posts = require('../../models/posts')
/** 
 *  GET Blog page
 */
function getAllPosts(req, res, next) {
    let perPage = 5;
    let page = req.query.page || 1;
    let skip = (perPage * page) - perPage;

    Posts.find({}, null, {skip: skip, limit: perPage}, function(err, posts) {
        var postsMap = [];
        posts.forEach(function(post) {
            postsMap.push({
              'id': post._id,
              'title': post.title,
              'link': '#', /** @TODO: Output link to post */
              'create_date': '#', /** @TODO: Output date of creation */
          });
        });

        Posts.count(function(err, count) {
            res.render('public/posts', { title: 'Blog', posts: postsMap, current: page, pages: Math.ceil(count / perPage), messages: req.flash() }); 
        });
    });   
}

/**
 * Get Item Post
 */
function getItemPost(req, res, next) {
    res.render('public/post', { title: 'Item Post', messages: req.flash()});
}


//==============================================================================
/**
* Export module
*/
module.exports = {
    getAllPosts: getAllPosts,
    getItemPost: getItemPost
};
//==============================================================================