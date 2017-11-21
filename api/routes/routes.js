'use strict';
module.exports = function(app) {
	const api = require('../controllers/controller');

	app.route('/users')
		.get(api.list_all_users)
		.post(api.create_an_user);

	app.route('/users/:id')
		.get(api.read_an_user)
		.put(api.update_an_user)
		.delete(api.delete_an_user);

	app.route('/register')
		.post(api.register);

	app.route('/login')
		.post(api.login);
};
