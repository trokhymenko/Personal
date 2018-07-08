var passport = require('passport');

/** 
 *  GET Login page
 */
function getLogin(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/admin');
    }
	res.render('admin/auth/login', { title: 'Please sign in', messages: req.flash()});
}

function getLogout(req, res, next) {
    req.logout();
    res.redirect('/admin/login');
}


//==============================================================================
/**
* Export module
*/
module.exports = {
    login: getLogin,
    logout: getLogout
};
//==============================================================================