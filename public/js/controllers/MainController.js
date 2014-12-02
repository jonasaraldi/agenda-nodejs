app.controller('MainController', 
	['$scope','ContactService', function($scope,ContactService){
		$scope = $scope || {};

		var isUpdate = false;
		$scope.loading = false;
		$scope.contacts = [];
		$scope.current = {};

		function _showMessage(message) {
			$scope.message = message || '';
			setTimeout(function() {
				$scope.message = '';
			}, 1000);
		}

		function _resetCurrent() {
			$scope.current = {
				name: '',
				address: '',
				phones: [],
				emails: []
			};
		}

		function _loadingUntil(func) {
			$scope.loading = true;
			if(func && func instanceof Function) 
				func();
			$scope.loading = false;
		}

		function _getContacts(){
			_loadingUntil(function() {
				ContactService.get(function(response){
					$scope.contacts = response;
				});
			});
		}

		$scope.saveContact = function() {
			_loadingUntil(function() {
				$scope.current.phones = ($scope.current.phones instanceof Array) ? $scope.current.phones : $scope.current.phones.split(',');
				$scope.current.emails = ($scope.current.emails instanceof Array) ? $scope.current.emails : $scope.current.emails.split(','); 

				if(isUpdate) {
					ContactService.update({
						id: $scope.current._id
					}, $scope.current, function(response) {
						_getContacts();
						_showMessage(response.message);
					});
					isUpdate = false;
				}
				else {
					ContactService.create($scope.current, function(response) {
						_getContacts();
						_showMessage(response.message);
					});
				}

				_resetCurrent();
			});
		};

		$scope.updateContact = function(contact) {
			$scope.current = angular.copy(contact);
			isUpdate = true;
		};

		$scope.deleteContact = function(contact) {
			_loadingUntil(function() {
				ContactService.delete({
					id: contact._id
				}, function(response) {
					if($scope.current._id === contact._id)
						_resetCurrent();

					_getContacts();
					_showMessage(response.message);
				});
			});
		};

		_resetCurrent();
		_getContacts();
	}]);