myApp.controller('redCtrl', ['$scope','$log','filterFilter','curryService', function($scope,$log,filterFilter,curryService) {
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
	 
	 var scope = {name: 'Inigo Montoya'}; 
	//var mycurr=curryService.bind(function() { alert("hellow"); });
	
	var f=function(x,y) {
		var ret='My name is ' + this.name +  " x= " + x + " y " + y + " 3rd arg is " + arguments[2];
		$log.debug(ret);
		$log.debug("my fn arguments");
		$log.debug(arguments);
	    return ret;
	}
	var z=3,a=17
	var sayIt = curryService.bind(f,scope,z,a);
	$log.debug(sayIt);
	sayIt(99,19);
	//mycurr();
	var greeter = function(greeting, separator, emphasis, name) {
		var myinfo=greeting + separator + name + emphasis;
		  $log.log(myinfo);
		  this.curryInfo=myinfo;
	};
	var greetHello = curryService.bind(greeter,$scope, "Hello", ".... ","!");
	greetHello("Heidi"); //"Hello, Heidi."
	greetHello("Eddie"); //"Hello, Eddie."
	 
}]);