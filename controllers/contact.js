module.exports = function(app) {
	var Contact = app.models.contact;

	var ContactController = {
		index: function(req,res) {
			Contact.find({}, function (error, contacts){
				if(error)
					return res.status(500,error);

				res.send(contacts);
			});
		},
		create: function(req,res) {
			var contact = new Contact(req.body);
			contact.save(function(error, contact) {
				if(error)
					return res.status(500,error);
		
				res.send({ message: 'Cadastrado com sucesso' });
			});
		},
		destroy: function(req,res) {
			var id = req.params.id;
			Contact.findById(id, function(error, contact){
				if(error)
					return res.status(500,error);

				if (!contact)
					return res.send({ message: 'Contato não existe' });
					
				contact.remove(function(){
					res.send({ message: 'Removido com sucesso' });
				});
			});
		},
		update: function(req,res) {
			var id = req.params.id;
			Contact.findById(id, function(error, contact){
				if(error)
					return res.status(500,error);
				
				contact.name = req.body.name;
				contact.address = req.body.address;
				contact.phones = req.body.phones;
				contact.emails = req.body.emails;

				contact.save(function(error) {
					if(!error)
						res.send({ message: 'Editado com sucesso' });
				});
			});
		}
	};

	return ContactController;
};