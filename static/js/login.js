var myApp = angular.module('myApp', []);

myApp.controller('userCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('/').success(function(req) {
		console.log('aw');
	});
}]);