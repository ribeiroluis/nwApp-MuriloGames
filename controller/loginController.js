/// <reference path="../js/connectionControl.js" />
/// <reference path="../js/angular.js" />
/// <reference path="../js/toastr.min.js" />

window.app.controller("loginController", function ($scope, $location) {
	$("#user").focus();
	var conn = new connectionControl();	
	$scope.login = function () {
		try{
			$("#submitLoading").show();
			conn.findUser(this.user, this.password, function(data){
				$scope.$parent.isAuth = true;
				$scope.$parent.authSession = data.name;
				$("#submitLoading").hide();
				$location.path("/home");
				$scope.$apply();
			}, function(){
				$("#submitLoading").hide();
				if(!$scope.$parent.isAuth)
					toastr.error("Senha/Usuário inválidos");
			});
		}catch (error){
			toastr.error(error);
		}
	};	
});