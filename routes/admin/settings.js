// Setting Page
function get_settings(req, res) {
    res.render('admin/pages/settings', { title: 'Settings', messages: req.flash() }); 
}


//==============================================================================
/**
* Export module
*/
module.exports = {
    page: get_settings,
};
//==============================================================================