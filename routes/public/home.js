module.exports = function (req, res, next) {
	res.render('public/index', { title: 'Express.js' });
}