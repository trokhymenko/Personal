var express = require('express');
var importRoutes = require('../utils/importer');

var router = express.Router();
var simportRoutes = importRoutes.dispatchImporter(__dirname);

// Load Routes
var routes = {
	public: simportRoutes('./public'),
};

// Nav menu and other vars
let locals = function(req, res, next) {
	res.locals.nav = [
		{ label: 'Home', key: 'home', href: '/' },
	];

	next();
};
router.use(locals);

/* GET home page. */
router.get('/', routes.public.home);

/* GET all posts. */
router.get('/blog', routes.public.blog.getAllPosts);

/**
 * Get Item Post
 */
router.get('/post', routes.public.blog.getItemPost);

module.exports = router;
