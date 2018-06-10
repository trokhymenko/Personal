module.exports = function (req, res, next) {
    // console.log(res);
    
	res.render('admin/pages/common-dashboard', { title: 'Express Dashboard Home' });
}