app.controller('MainController', 
	['$scope','ContactService', function($scope,ContactService){

		$scope = $scope || {};

		var isUpdate = false;
		$scope.current = {
			name: '',
			address: '',
			phones: '',
			emails: ''
		};
		$scope.contacts = [];

		function _getContacts(){
			ContactService.get(function(response){
				$scope.contacts = response;
			});
		}

		$scope.saveContact = function() {
			$scope.current.phones = $scope.current.phones.split(';');
			$scope.current.emails = $scope.current.emails.split(';');

			if(isUpdate) {
				ContactService.update({
					id: $scope.current._id
				}, $scope.current);
				isUpdate = false;
			}
			else {
				ContactService.create($scope.current);
			}

			_getContacts();
		};

		$scope.updateContact = function(contact) {
			$scope.current = angular.copy(contact);
			console.log($scope.current);
			isUpdate = true;
		};

		$scope.deleteContact = function(contact) {
			ContactService.delete({
				id: contact._id
			});
			_getContacts();
		};

		_getContacts();
	}]);