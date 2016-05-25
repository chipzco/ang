myApp.controller('frefCtrl', ['$scope','$log','filterFilter', function($scope,$log,filterFilter) {
	$scope.myheader="Hello FREF IS HERE!"; 
	 //$scope.obj1way={ datax:123, datay:44.23 };
	 $scope.obj1way="832938";
	 $scope.format={ datax:123, datay:44.23 };
	 $scope.what={ datax:123, datay:44.23 };
	 $log.debug($scope.obj1way);
	 $scope.checkmyobj=function() {
		 $log.warn("checking my object in top level");
		$log.debug($scope.obj1way); 
	 };
}]);