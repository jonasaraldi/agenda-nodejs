module.exports = function(app) {
	var Contact = app.models.contact;

	var ContactController = {
		index: function(req,res) {
			Contact.find({}, function (error, contacts){
				if(error){
					res.status(500,error);
					return;
				}

				res.send(contacts);
			});
		},
		create: function(req,res) {
			var contact = new Contact(req.body);
			contact.save(function(error, contact) {
				if(error) {
					res.status(500,error);
					return;
				}

				res.send({ message: 'Cadastrado com sucesso' });
			});
		},
		destroy: function(req,res) {
			var id = req.params.id;
			console.log(id);
			Contact.findById(id, function(error, contact){
				if(error){
					res.status(500,error);
					return;
				}

				if (!contact) {
					res.send({ message: 'Contato não existe' });
					return;
				}

				contact.remove(function(){
					res.send({ message: 'Removido com sucesso' });
				});
			});
		},
		update: function(req,res) {
			var id = req.params.id;
			Contact.findById(id, function(error, contact){
				if(error){
					res.status(500,error);
					return;
				}

				contact = req.body;
				contact.save(function(error) {
					if(!error)
						res.send({ message: 'Editado com sucesso' });
				});
			});
		}
	};

	return ContactController;
};