myApp.directive('myDir',function($interval, dateFilter) {
	function link(scope, element, attrs) {
	    var format,
        timeoutId;

	    function updateTime() {
	      element.text(dateFilter(new Date(), scope.format)  + "  "  + " name: "  + scope.name.name + " add: " + scope.name.addr);
	    }
	    /*
	    scope.$watch(attrs.myCurrentTime, function(value) {
	      format = value;
	      updateTime();
	    });
*/
	    element.on('$destroy', function() {
	      $interval.cancel(timeoutId);
	    });

	    // start the UI update process; save the timeoutId for canceling
	    timeoutId = $interval(function() {
	    	//alert("hi")
	    	updateTime(); // update DOM
	   }, 1000);
   }
	return {
		restrict: 'EA',
		
		scope: { 
			name: '=',
			format: '='
		},	
		link: link 
		
	};
})

  .directive('showPriceArrow',['$timer',function($timer) {  
	  function link(scope, element, attrs) {
		    var format,
	        timeoutId;

		    function updateTime() {
		      element.text(" consider: "  + scope.considerPrice + " curr: " + scope.currentPrice);
		    }
		    /*
		    scope.$watch(attrs.myCurrentTime, function(value) {
		      format = value;
		      updateTime();
		    });
	*/
		    element.on('$destroy', function() {
		      $interval.cancel(timeoutId);
		    });

		    // start the UI update process; save the timeoutId for canceling
		    timeoutId = $timer(function() {
		    	//alert("hi")
		    	updateTime(); // update DOM
		   }, 1000);
	   }
	  
	  
    	return {
    		restrict: 'E',    		
    		
    		scope: {
    			considerPrice: '=',
    			currentPrice: '=',
    			isChanged: '='
    		},
    		/*
    	   controller: function($scope) {
    		   //$scope.isChanged=scope.isChanged;
    		   $scope.getPrice=function() {
    			   return $scope.considerPrice; 
    		   }
    		   $scope.getMessage=function() {    			   
    			   var msg="test";
    	    		if ($scope.isChanged) {
    	    			msg=" Originally ";
    	    		}
    	    		return msg;
    		   }
    		   $scope.getDirectionClass=function() {
    			   var classname="glyphicon-arrow-left"
    			   return classname;	   
    		   }
    		   
    	   },  */  	   
    	   link:link
    	}    	
    }])

;