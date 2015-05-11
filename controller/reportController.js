window.app.controller("reportController", function ($scope) {
	$("#menuReport").toggleClass('active');
	$("#startDate").datepicker($.datepicker.regional["pt-br"]);
	$("#endDate").datepicker($.datepicker.regional["pt-br"]);
	var conn = new connectionControl();
//	$scope.startDate = new Date().toLocaleDateString();
//	$scope.endDate = new Date().toLocaleDateString();
	$scope.Data = [];

	$scope.searchData = function () {		
		try {
			debugger;
			$("#reportLoading").show();
			if (this.startDate == this.endDate) {
				conn.getServicesFromDate(this.startDate, function (data) {
					groupData(data);
					$scope.$apply();
					$("#reportLoading").hide();
				});
			} else {
				conn.getAllServices(function (data) {
					var startDate = new Date(this.startDate);
					var endDate = new Date(this.endDate);
					$scope.$apply();
					$("#reportLoading").hide();
				});
			}
		} catch (error) {
			$("#reportLoading").hide();
		}
	}

	function groupData(data) {
		var total = _.sum(data, function (object) {
			return object.price;
		});
		var banca = _.filter(data, function (n) {
			if (n.payment == "Banca")
				return n.price;
		});
		var bancaCartao = _.filter(data, function (n) {
			if (n.payment == "Banca Cartão")
				return n.price;
		});
		var loja = _.filter(data, function (n) {
			if (n.payment == "Loja")
				return n.price;
		});
		$scope.Data = [
			{ name: "Total", value: total },
			{ name: "Banca", value: _.sum(banca, function (object) {
			return object.price;
		}) },
			{ name: "Banca Cartão", value: _.sum(bancaCartao, function (object) {
			return object.price;
		}) },
			{ name: "Loja", value: _.sum(loja, function (object) {
			return object.price;
		}) },
		];
	}
	$scope.titulo = "Relatórios";
	$scope.changeTab = function (value) {
		$("#" + value.target.attributes[1].nodeValue).siblings('.active').toggleClass('active');
		$("#" + value.target.attributes[1].nodeValue).toggleClass('active')
	}
});