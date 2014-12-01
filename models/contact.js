module.exports = function(app) {
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var contact = Schema({
		name: { type: String },
		address: { type: String },
		phones: [{ type: String }],
		emails: [{ type: String }]
	});

	return mongoose.model('contacts', contact);
};