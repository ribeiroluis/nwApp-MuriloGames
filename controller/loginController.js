/// <reference path="../js/connectionControl.js" />
/// <reference path="../js/angular.js" />
/// <reference path="../js/toastr.min.js" />

window.app.controller("loginController", function ($scope, $location) {
	"use strict",

	$("#user").focus();
	$scope.title = "Iniciar";
	var existUser = false;

	var conn = new connectionControl();
	$scope.initilize = function () {
		conn.findUsers(function (data) {
			existUser = true;

		}, function () {
				toastr.inf("Cadastre novo usuário.");
				$scope.title = "Cadastrar novo usuário";
				$("#name").focus();
				$("#nameInput").show();
				$("#passwordInput").show();
				existUser = false;
			});
	} ();







	$scope.login = function () {
		try {
			$("#submitLoading").show();
			if (!existUser) {
				var user = {
					name: this.name,
					user: this.user,
					password: this.password
				};

				conn.insertUser([user], function (success) {
					if (success.result.ok) {
						$("#insertLoading").hide();
					}
				}, function (err) {
						toastr.erro("Erro ao gravar os dados!" + err);
						$("#insertLoading").hide();
					});
			}


			$("#submitLoading").show();
			conn.findUser(this.user, this.password, function (data) {
				$scope.$parent.isAuth = true;
				$scope.$parent.authSession = data.name;
				$("#submitLoading").hide();
				$location.path("/home");
				$scope.$apply();
			}, function () {
					$("#submitLoading").hide();
					if (!$scope.$parent.isAuth)
						toastr.error("Senha/Usuário inválidos");
				});
		} catch (error) {
			toastr.error(error);
		}
	};
});