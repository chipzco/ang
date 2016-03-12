myApp.controller('redCtrl', ['$scope','$log','filterFilter', function($scope,$log,filterFilter) {
	 $scope.format = 'M/d/yy h:mm:ss a';
	 $scope.ch={};
	 $scope.ch.name="chARLES";
	 $scope.ch.addr="55 road W";
	 
	 
	 var a={};
	 a.code="XXX";
	 a.arr="something else";
	 a.arr=[];  a.arr[0]={}; 	a.arr[0].key="something";
	 
	 var arr=[2,3,5,7,9,11,12,5];
	 
	 var ret=filterFilter(arr,5,true);
	 $log.debug("ret:"); 
	 $log.debug(ret);
	 
	 var filter=function(elem) {
		if (elem % 2 && elem !=11)
			return true;
		return false;
	 };
	 
	 var ret2=filterFilter(arr,filter,true);
	 $log.debug("ret:"); 
	 $log.debug(ret2);
	 
	 
	 $scope.isarray="default nothing happened";	 
	 
	 if (a.arr && angular.isArray(a.arr) && a.arr.length && a.arr[0] && a.arr[0].key) {
		 $scope.isarray="array is there with key value: " + a.arr[0].key;
	 }
	 else 
		 $scope.isarray="array is NOT THERE " ;
	 
}]);