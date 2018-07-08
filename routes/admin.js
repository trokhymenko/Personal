var express = require('express');
var importRoutes = require('../utils/importer');
var passport = require('passport');
var midleware = require('../midleware/authMidleware');

var router = express.Router();
var simportRoutes = importRoutes.dispatchImporter(__dirname);

// Load Routes
var routes = {
	admin: simportRoutes('./admin'),
};

// Nav menu and other vars
let locals = function(req, res, next) {
	res.locals.nav = [
		{ label: 'Dashboard', key: 'dashboar', href: '/admin' },
		{ label: 'Posts', key: 'posts', href: '/admin/posts' },
		{ label: 'Media', key: 'media', href: '/admin/media' },
		{ label: 'Users', key: 'users', href: '/admin/users' },
		{ label: 'Settings', key: 'settings', href: '/admin/settings' }
	];
	next();
};
router.use(locals);

//------------------------------------------------------------------------
/**
 * API for Admin Panel
 */
router.post('/api/user/add', midleware.checkAuth, routes.admin.api.add);
router.post('/api/user/delete', midleware.checkAuth, routes.admin.api.delete);


//------------------------------------------------------------------------

/* GET home page. */
router.get('/', midleware.checkAuth, routes.admin.dashboard);

/* GET login page. */
router.get('/login', routes.admin.auth.login);

/* POST login page. */
router.post('/login', 
	passport.authenticate('local', {successRedirect: '/admin', failureRedirect: '/admin/login', failureFlash: true }), 
	routes.admin.auth.login
);

/* GET logout. */
router.get('/logout', routes.admin.auth.logout);

/* GET Users Page. */
router.get('/users', midleware.checkAuth, routes.admin.users.page);

/* GET All Posts Page. */
router.get('/posts', midleware.checkAuth, routes.admin.posts.page);

/* Add new Post. */
router.all('/post/add', midleware.checkAuth, routes.admin.posts.edit);
/* Edit post */
router.all('/post/edit/:postid', midleware.checkAuth, routes.admin.posts.edit);
/* Delete post */
router.all('/post/delete/:postid', midleware.checkAuth, routes.admin.posts.delete);

/* Media Page. */
router.get('/media', midleware.checkAuth, routes.admin.media.page);
/* Delete post */
router.get('/media/delete/:postid', midleware.checkAuth, routes.admin.media.delete);

/* Media Page. */
router.get('/settings', midleware.checkAuth, routes.admin.settings.page);

module.exports = router;
