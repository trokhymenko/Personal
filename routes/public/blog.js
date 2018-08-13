
/** 
 *  GET Blog page
 */
function getAllPosts(req, res, next) {
    
	res.render('public/posts', { title: 'Blog', messages: req.flash()});
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