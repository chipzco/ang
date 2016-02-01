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
	    });*/
	   
	    // start the UI update process; save the timeoutId for canceling
	    timeoutId = $interval(function() {
	    	//alert("hi")
	    	updateTime(); // update DOM
	   }, 1000);
	    
	    element.on('$destroy', function() {
		     $interval.cancel(timeoutId);
		 });
 
	    
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

  .directive('showPriceArrow',[function() {  
	  
	  
    	return {
    		restrict: 'E',    		
    		transclude: true,
    		scope: {
    			considerPrice: '&',
    			currentPrice: '&',
    			isChanged: '&',
    			priceData: '&',
    			passfn: '&',
    			close: '&onClose',
    			anothpass: '&pass2fn'
    		},
    		
    	   controller: function($scope) {
    		   //$scope.isChanged=scope.isChanged;
    		   $scope.getPrice=function() {
    			   return $scope.considerPrice; 
    		   };
    		   $scope.x=11;
    		   $scope.getMessage=function() {    			   
    			   var msg="test";
    	    		if ($scope.isChanged===true) {
    	    			msg=" Originally ";
    	    		}
    	    		var addprice=$scope.currentPrice() + 15;
    	    		
    	    		if ('currPrice' in $scope.priceData()) {
    	    			var addprice2=$scope.priceData().currPrice + 15;
    	    			msg=" price data - current price: " + $scope.priceData().currPrice + " add something:    " + addprice2;
    	    		}
    	    		else 
    	    			msg += " typeof: " +  typeof($scope.priceData());
    	    		
    	    		return msg + ":  "  + $scope.currentPrice() + " now: " + addprice;
    		   };
    		   $scope.getDirectionClass=function() {
    			   var classname="glyphicon-arrow-left";
    			   return classname;	   
    		   }; 
    		   
    		   $scope.checkPriceDiff=function() {
    			   var invalue=parseInt($scope.x);
    			   
    			   var retfn=$scope.passfn();
    			   var retvalue=retfn(invalue);
    			   $scope.retmessage="invalue= " + invalue + " the return is: " + retvalue;  //  + retvalue;
    		   };
    		   
    		   
    		   
    	   } ,
    	   templateUrl: 'js/directives/showPriceArrow.htm'
    	  
    	};    	
    }])

;