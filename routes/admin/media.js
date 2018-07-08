// var Posts = require('../../models/posts'),
//     async = require('async');

// Posts page
function get_images(req, res) {
    
    res.render('admin/pages/media', { title: 'Media', messages: req.flash() }); 
}

// Delete Post
function delete_image(req, res) {
    // if (req.params.postid) {
    //     Posts.findByIdAndRemove(req.params.postid, function(err, item) {
    //         if (err) {
    //             req.flash('error', 'Error!'); 
    //             res.redirect('/admin/posts');  
    //         } else {
    //             req.flash('error', 'Deleted!'); 
    //             res.redirect('/admin/posts');  
    //         }       
    //     });
    // }
}

//==============================================================================
/**
* Export module
*/
module.exports = {
    page: get_images,
    delete: delete_image
};
//==============================================================================