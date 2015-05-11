window.app.controller("reportController", function ($scope) {
	$("#menuReport").toggleClass('active');
	$scope.titulo = "Relatórios";
	$scope.data = [];

	for (var index = 0; index < 10; index++) {
		$scope.data.push($scope.titulo + index);
	}
});