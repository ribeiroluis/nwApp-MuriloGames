/// <reference path="../typings/lodash/lodash.d.ts"/>
/* global connectionControl */
/* global $ */
window.app.controller("reportController", function ($scope) {
	"use strict",
		
	$("#menuReport").toggleClass('active');	
	$("#startDate").datepicker({
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        $( "#endDate" ).datepicker( "option", "minDate", selectedDate );
      }
    });
    $("#endDate" ).datepicker({      
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        $( "#startDate" ).datepicker( "option", "maxDate", selectedDate );
      }
    });
	setTimeout(function() {
		$("#startDate").datepicker( "setDate", new Date().toLocaleDateString() );
		$("#endDate").datepicker( "setDate", new Date().toLocaleDateString() );		
	}, 1);
	
	$scope.titulo = "Relatórios";
	var conn = new connectionControl();
	$scope.Data = [];

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
	}

	function groupData(data) {
		$scope.services = _.groupBy(data,function(obj){
			return obj.service; 
		});
		debugger;
		
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
	
	
	$scope.changeTab = function (value) {
		$("#" + value.target.attributes[1].nodeValue).siblings('.active').toggleClass('active');
		$("#" + value.target.attributes[1].nodeValue).toggleClass('active')
	}
	
	$('#generalChart').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Vendas por forma de pagamento no período'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point}',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                ['Firefox',   45.0],
                ['IE',       26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['Others',   0.7]
            ]
        }]
    });
});