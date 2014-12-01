app.factory('ContactService', ['$resource', function($resource) {
    return $resource('/api/contacts/:id', {
        id: '@id'
    }, {
        create:{
            method:'POST'
        },
        get:{
            method:'GET',
            isArray: true
        },
        'delete':{
            method:'DELETE'
        },
        update:{
            method: 'PUT'
        }
    });
}]);