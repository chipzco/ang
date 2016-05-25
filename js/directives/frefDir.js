myApp.directive('frefDir',function($log,$interval, dateFilter) {
	var fns={};
	fns.link=function(scope, element, attrs) {
	    var format,timeoutId;
	   
	    function updateTime() {
	    	element.text(dateFilter(new Date(), scope.format));
	    }	   
	    // start the UI update process; save the timeoutId for canceling
	    /*
	    timeoutId = $interval(function() {
	    	//alert("hi")
	    	 
	    	updateTime(); // update DOM
	    }, 1000);
	    */
	    element.on('$destroy', function() {
		     $interval.cancel(timeoutId);
		 });
	    
	    scope.testme=function () { 	   
	    	 $log.warn("scope.mydirobj=");
	    	 if (scope.mydirobj) {
	    		 $log.debug(scope.mydirobj.datax);
	    		 $log.debug(scope.mydirobj.datay);
	    	 }
	    	 else {
	    		 $log.error("error");
	    	 }
		     //$log.debug(idchild);   $log.debug(targetelement);
		     $log.warn("heelo");		    
	    };    	 
	    $log.warn("heelo");    
   };
   fns.cnt=function($scope) {
	   //var myobj=angular.fromJson($scope.obj1way);
	   
	   var myobj=$scope.objinway();
	   $log.warn("from controller passed in")
	   $log.debug(myobj);
	   $log.debug($scope.format);	   
	   if (myobj && angular.isObject(myobj)) {
		   $log.debug(myobj.datax);
		   $log.debug(myobj.datay);
		   $log.warn("about to change value");
		   myobj.datax=99;
		   $log.debug(myobj);
	   }
	   else 
		   $log.warn("crap it is undefined!!!!");
	   //var myobj2=angular.fromJson($scope.obj1way);
	   if ($scope.objinway && angular.isFunction($scope.objinway)) {
		   var myobj2=$scope.objinway();
		   $scope.mydirobj=myobj;
		   $log.warn("myobj2 obtained from passed in object")
		   $log.debug(myobj2);
	   }	   	     
   };	
	
	return {
		restrict: 'E',		
		scope: {		
			objinway: '&',
			format: '='
		},	
		link: fns.link,
		controller:fns.cnt,
		templateUrl: 'js/directives/frefDir.htm'	
	};
});


  