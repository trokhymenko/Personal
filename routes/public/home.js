module.exports = function (req, res, next) {
	res.render('public/index', { title: 'My person site development on Express.js' });
}