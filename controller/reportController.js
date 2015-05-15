/// <reference path="../typings/lodash/lodash.d.ts"/>
/* global connectionControl */
/* global $ */
window.app.controller("reportController", function ($scope) {
	"use strict",

	$("#menuReport").toggleClass('active');
	$("#startDate").datepicker({
		numberOfMonths: 1,
		onClose: function (selectedDate) {
			$("#endDate").datepicker("option", "minDate", selectedDate);
		}
    });
    $("#endDate").datepicker({
		numberOfMonths: 1,
		onClose: function (selectedDate) {
			$("#startDate").datepicker("option", "maxDate", selectedDate);
		}
    });
	setTimeout(function () {
		$("#startDate").datepicker("setDate", new Date().toLocaleDateString());
		$("#endDate").datepicker("setDate", new Date().toLocaleDateString());
	}, 1);

	var conn = new connectionControl();
	$scope.titulo = "Relatórios";
	$scope.payments = [{ "name": "Banca" }, { "name": "Banca Cartão" }, { "name": "Loja" }];
	$scope.reportView = [
		{ "title": "Relatório por serviço realizado", "type": "service", "name": "Serviços", "data": [] },
		{ "title": "Relatório por local de pagamento", "type": "payment", "name": "Pagamentos", "data": [] },
		{ "title": "Relatório por data", "type": "date", "name": "Datas", "data": [] },
	];
	$scope.selectedReport = $scope.reportView[1];


	$scope.searchGeneralData = function () {
		try {
			$("#reportLoading").show();
			var _startDate = $("#startDate").datepicker("getDate");
			var _endDate = $("#endDate").datepicker("getDate");
			var startDate = new Date(_startDate.getFullYear(), _startDate.getMonth(), _startDate.getDate(), 0, 0, 0);
			var endDate = new Date(_endDate.getFullYear(), _endDate.getMonth(), _endDate.getDate(), 23, 59, 59);
			conn.getServicesFromDate(startDate, endDate, function (data) {
				groupData(data);
				$scope.$apply();
				$("#reportLoading").hide();
			});
		} catch (error) {
			$("#reportLoading").hide();
		}
	};

	function groupData(data) {
		$scope.selectedReport.total = _.sum(data, function (object) {
			return object.price;
		});
		var _type = $scope.selectedReport.type;		
		var _data = _.groupBy(data, function (obj) {
			if (_type != "date") {
				return obj[$scope.selectedReport.type];
			} else {
				return new Date(obj.date.getFullYear(), obj.date.getMonth(), obj.date.getDate()).toLocaleDateString();
				//return Date.UTC(obj.date.getFullYear(), obj.date.getMonth(), obj.date.getDate(), 23, 59, 59);
			}
		});
		$scope.selectedReport.data = [];
		_.forEach(_data, function (n, k) {
			$scope.selectedReport.data.push([k, _.sum(n, function (object) { return object.price; })]);
		});		
		generateChart(_data);
		debugger;
	};


	$scope.changeTab = function (value) {
		$("#" + value.target.attributes[1].nodeValue).siblings('.active').toggleClass('active');
		$("#" + value.target.attributes[1].nodeValue).toggleClass('active');
		generateChart();
	};

	$scope.changeReport = function (value) {
		$scope.searchGeneralData();
	};

	function generateChart(_data) {
		var _type = $scope.selectedReport.type;
		Highcharts.setOptions({
			lang: {
				noData: "Não há dados",
				decimalPoint: ','
			}
		});

		$('#generalChart').highcharts({
			credits: {
				href: ''
			},
			yAxis: {
				labels: {
					format: 'R${value}'
				},
				title:{
					text: ''
				}
			},
			xAxis: {				
				categories: _.keys(_data),
			},
			chart: {
				type: 'column'
			},
			title: {				
				text: $scope.selectedReport.title
			},
			tooltip: {
				valueDecimals: 2,
				valuePrefix: 'R$',
			},
			noData: {
				style: {
					fontWeight: 'bold',
					fontSize: '15px',
					color: '#ff00ff'
				}
			},
			series: [{
				name: $scope.selectedReport.name,
				data: $scope.selectedReport.data,
			}]
		});
	}
});