/**
 * Midleware check auth
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.checkAuth = function (req, res, next) {

    // Remove next after development
    // next();

    if (!req.isAuthenticated()) {
       res.redirect('/admin/login');
    } else {
        next();
    }	
}