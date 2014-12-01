module.exports = function(app) {
	var contact = app.controllers.contact;
	app.get('/api/contacts',contact.index);
	app.post('/api/contacts',contact.create);
	app.delete('/api/contacts/:id',contact.destroy);
	app.put('/api/contacts/:id',contact.update);
};