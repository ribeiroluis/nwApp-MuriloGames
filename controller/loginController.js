/// <reference path="../js/connectionControl.js" />
/// <reference path="../js/angular.js" />
/// <reference path="../js/toastr.min.js" />

window.app.controller("loginController", function ($scope, $location) {
	$scope.go = function (path) {
		debugger;
		$scope.$parent.isAuth = true;
		$scope.$parent.authSession = "Luis Ribeiro";
		toastr.info("Logou");
		$location.path(path);
	};
	
	
	/*var conn = new connectionControl();
	
	$scope.login = function () {
		conn.findUser($scope.name, $scope.password, function(data){
			console.log(data);
			debugger;
			$scope.logou = data;
			$scope.$apply();
		});
	}*/


});