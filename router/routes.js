window.app.config(function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl : 'tmpl/home.html',
		controller : 'homeController'
	}).when('/report', {
		templateUrl : 'tmpl/report.html',
		controller : 'reportController'
	}).otherwise({
		templateUrl : 'tmpl/login.html',
		controller : 'loginController'
	})
//	.otherwise({
//		redirectTo : '/home'
//	});
}); 