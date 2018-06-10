var express = require('express');
var importRoutes = require('../utils/importer');

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
	];

	next();
};
router.use(locals);

/* GET home page. */
router.get('/', routes.admin.dashboard);

/* GET login page. */
router.get('/login', routes.admin.auth.login);

module.exports = router;
