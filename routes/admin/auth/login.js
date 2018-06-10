module.exports = function (req, res, next) {
    // console.log(res);
    
	res.render('admin/auth/login', { title: 'Please sign in' });
}