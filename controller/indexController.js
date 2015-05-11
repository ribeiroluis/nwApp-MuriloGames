/// <reference path="../js/jquery-1.11.2.min.js" />

window.app.controller("indexController", function ($scope) {
	$scope.headerSrc = "tmpl/header.html";
	$scope.footerSrc = "tmpl/footer.html";
	$scope.loadingTmp = "tmpl/loading.html";
	$scope.appTitle = "MuriloGames";
	$scope.isAuth = false;

	$scope.selectMenuItem = function (value) {
		$(value.currentTarget).siblings('.active').toggleClass('active');
	}
	$scope.checkAuth = function () {
		if ($scope.isAuth)
			return true;
	}
});