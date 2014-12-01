module.exports = function(app) {
	var mongoose = require('mongoose');

	var contact = mongoose.Schema({
		name: { type: String },
		address: { type: String },
		phones: [{ type: String }],
		emails: [{ type: String }]
	});

	return mongoose.model('contacts', contact);
};