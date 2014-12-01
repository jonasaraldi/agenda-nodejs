var mongoose = require('mongoose');
var single_connection;
var urls = {
	'local': 'mongodb://localhost/agenda',
	'remote': 'mongodb://jonas_usr:agenda2014@ds041177.mongolab.com:41177/agenda'
};

module.exports = function() {  
	var url = urls['local'];

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		console.log('MongoDB connected.');
	});

	return mongoose.connect(url);
};