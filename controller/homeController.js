window.app.controller("homeController", function($scope) {
	$("#menuHome").toggleClass('active');
	
	$scope.titulo = "Inicio";
	$scope.data = [];
	
	for (var index = 0; index < 10; index++) {
		$scope.data.push($scope.titulo + index);
	}	
});