app.controller('MainController', 
	['$scope','ContactService', function($scope,ContactService){

		$scope = $scope || {};

		var isUpdate = false;
		$scope.contacts = [];
		$scope.current = {
			name: '',
			address: '',
			phones: [],
			emails: []
		};

		function _resetCurrent() {
			$scope.current = {
				name: '',
				address: '',
				phones: [],
				emails: []
			};
		}

		function _getContacts(){
			ContactService.get(function(response){
				$scope.contacts = response;
			});
		}

		$scope.saveContact = function() {
			console.log($scope.current);
			$scope.current.phones = (typeof $scope.current.phones == 'array') ? $scope.current.phones.split(',') : $scope.current.phones;
			$scope.current.emails = (typeof $scope.current.emails == 'array') ? $scope.current.emails.split(',') : $scope.current.emails; 

			if(isUpdate) {
				ContactService.update({
					id: $scope.current._id
				}, $scope.current);
				isUpdate = false;
			}
			else {
				ContactService.create($scope.current);
			}

			_resetCurrent();
			_getContacts();
		};

		$scope.updateContact = function(contact) {
			$scope.current = angular.copy(contact);
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