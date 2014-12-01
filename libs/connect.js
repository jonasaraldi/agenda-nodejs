var mongoose = require('mongoose');
var single_connection;

module.exports = function() {  
	var url = 'mongodb://jonas_usr:agenda2014@ds041177.mongolab.com:41177/agenda';

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		console.log('MongoDB connected.');
	});

	return mongoose.connect(url);
};