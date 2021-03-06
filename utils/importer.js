var fs = require('fs');
var path = require('path');

/**
 * Returns a function that looks in a specified path relative to the current
 * directory, and returns all .js modules in it (recursively).
 *
 * ####Example:
 *
 *     var importRoutes = import.importer(__dirname);
 *
 *     var routes = {
 *         site: importRoutes('./site'),
 *         api: importRoutes('./api')
 *     };
 *
 */

module.exports.dispatchImporter = function (rel__dirname) {

	function importer (from) {
		var imported = {};
		var joinPath = function () {
			return '.' + path.sep + path.join.apply(path, arguments);
		};

		var fsPath = joinPath(path.relative(process.cwd(), rel__dirname), from);
		fs.readdirSync(fsPath).forEach(function (name) {
			var info = fs.statSync(path.join(fsPath, name));
			if (info.isDirectory()) {
				imported[name] = importer(joinPath(from, name));
			} else {
				// only import files that we can `require`
				var ext = path.extname(name);
				var base = path.basename(name, ext);
				if (require.extensions[ext]) {
					imported[base] = require(path.join(rel__dirname, from, name));
				}
			}
		});

		return imported;
	}

	return importer;
};