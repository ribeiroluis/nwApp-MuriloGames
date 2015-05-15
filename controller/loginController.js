/* global toastr */
/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../js/connectionControl.js" />
/// <reference path="../js/angular.js" />
/// <reference path="../js/toastr.min.js" />

window.app.controller("loginController", function ($scope, $location) {
	"use strict",

	$("#user").focus();
	$scope.title = "Cadastrar primeiro usuário";
	$scope.existUser = false;

	var conn = new connectionControl();
	$scope.initilize = function () {
		conn.findUsers(function (data) {
			if(data > 0){
				$scope.existUser = true;
				$scope.title = "Iniciar";
				$scope.$apply();				
			}
		}, function () {
				$scope.existUser = false;
				$scope.$apply();
			});
	} ();
	
	$scope.validatePassword = function (params) {
		if(this.password !== this.confirmPassword)
			$('#confirmPassword').addClass("has-error");
		else
			$('#confirmPassword').removeClass("has-error");		
			
	}


	$scope.login = function () {
		try {
			if(!$scope.existUser && this.password !== this.confirmPassword){
				toastr.error("Senhas não conferem!");
				$("#confirmPassword").focus();
				return;
			}
			
			$("#submitLoading").show();
			if (!$scope.existUser) {
				var user = {
					name: this.user,
					user: this.user,
					password: CryptoJS.MD5(this.password).toString()
				};

				conn.insertUser([user], function (success) {
					if (success.result.ok) {
						$scope.existUser = true;
						$scope.login();
					}
				}, function (err) {
						toastr.erro("Erro ao gravar os dados!" + err);
						$("#insertLoading").hide();
					});
			}else{
				
			}
			conn.findUser(this.user, CryptoJS.MD5(this.password).toString(), function (data) {
				if($scope.$parent == null)
					return;
					
				$scope.$parent.isAuth = true;
				$scope.$parent.authSession = data.name;
				$("#submitLoading").hide();
				$location.path("/home");
				$scope.$apply();
			}, function () {
					if($scope.$parent == null)
						return;
					
					$("#submitLoading").hide();
					if (!$scope.$parent.isAuth)
						toastr.error("Senha/Usuário inválidos");
				});
		} catch (error) {
			toastr.error(error);
		}
	};
});