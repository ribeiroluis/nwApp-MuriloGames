/* global toastr */
window.app.controller("homeController", function ($scope, $location) {
	"use strict",
	
	$("#menuHome").toggleClass('active');
	$("#service").focus();
	$("#date").datepicker({
		onSelect:function(){
			var date = new Date($("#date").datepicker("getDate"));
			$scope.date = date;
			getServices();			
		}
	});
	setTimeout(function() {
		$("#date").datepicker( "setDate", new Date().toLocaleDateString() );		
	}, 1);
	

	var conn = new connectionControl();
	$scope.titulo = "Inicio";
	$scope.payments = [{ "name": "Banca" }, { "name": "Banca Cartão" }, { "name": "Loja" }];
	$scope.date = new Date();
	$scope.totalSold = 0;
	$scope.services = getServices();
	$scope.countServices = countServices();
	$scope.enableDate = false;

	function countServices() {
		conn.countServices(function (count) {
			$scope.countServices = count;
			$scope.$apply();			
		});
	}

	function getServices() {		
		var startDate = new Date($scope.date.getFullYear(), $scope.date.getMonth(), $scope.date.getDate(), 0, 0, 0);
		var endDate = new Date($scope.date.getFullYear(), $scope.date.getMonth(), $scope.date.getDate(), 23, 59, 59);

		conn.getServicesFromDate(startDate, endDate, function (services) {
			$scope.services = services;
			$scope.$apply();
			$("#date").datepicker( "setDate", $scope.date.toLocaleDateString() );
		});
	}

	$scope.insertService = function () {
		try {
			debugger;
			
			var date;
			if($scope.enableDate){
				date = $("#date").datepicker("getDate");				
			}else{
				date = new Date();
				$scope.date = date;
			}
			$("#insertLoading").show();
			var service = {
				number: $scope.countServices + 1,
				price: Number(this.price.replace(/,/g, '.')),
				service: this.service.toUpperCase(),
				payment: this.selectedPayment.name,
				date: date
			};
			var confirmSubmit = confirm("Confirmar inclusão?");
			if (confirmSubmit == true) {
				conn.insertService([service], function (success) {
					if (success.result.ok) {
						this.service = "";
						this.price = "";
						this.selectedPayment = undefined;
						getServices();
						countServices();
						toastr.success("Salvo com sucesso!");
						$("#insertLoading").hide();
					}
				}, function (err) {
						toastr.erro("Erro ao gravar os dados!" + err);
						$("#insertLoading").hide();
					});
			}
			$("#service").focus();
		} catch (error) {
			toastr.error("Algum campo não foi preenchido corretamente." + error.message);
		}
	}
});