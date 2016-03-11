myApp.controller('redCtrl', ['$scope', function($scope) {
	 $scope.format = 'M/d/yy h:mm:ss a';
	 $scope.ch={};
	 $scope.ch.name="chARLES";
	 $scope.ch.addr="55 road W";
	 
	 var a={};
	 a.code="XXX";
	 a.arr="something else";
	 a.arr=[];  a.arr[0]={}; 	a.arr[0].key="something";
	 $scope.isarray="default nothing happened";
	 if (a.arr && angular.isArray(a.arr) && a.arr.length && a.arr[0] && a.arr[0].key) {
		 $scope.isarray="array is there with key value: " + a.arr[0].key;
	 }
	 else 
		 $scope.isarray="array is NOT THERE " ;
	 
}]);