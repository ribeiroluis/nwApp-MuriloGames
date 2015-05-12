﻿/// <reference path="../typings/lodash/lodash.d.ts"/>
/* global connectionControl */
/* global $ */
window.app.controller("reportController", function ($scope) {
	$("#menuReport").toggleClass('active');
	debugger;
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
	$scope.startDate = new Date().toLocaleDateString();
	$scope.endDate = new Date().toLocaleDateString();
	
	setTimeout(function() {
		$("#startDate").datepicker( "setDate", new Date().toLocaleDateString() );
		$("#endDate").datepicker( "setDate", new Date().toLocaleDateString() );		
	}, 1);
	
	
	
	var conn = new connectionControl();
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
					
					groupData(data);					
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