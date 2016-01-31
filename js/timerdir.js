angular.module('docsTimeDirective', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.format = 'M/d/yy h:mm:ss a';
  $scope.ch={};
  $scope.ch.name="ch";
  $scope.ch.addr="55 road";
}])
.directive('myDir', ['$interval', 'dateFilter', function($interval, dateFilter) {
	
  function link(scope, element, attrs) {
    var format,
        timeoutId;

    function updateTime() {
      element.text(dateFilter(new Date(), scope.format) + " name: "  + scope.name.name + " add: " + scope.name.addr);
      //alert(format);
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
      updateTime(); // update DOM
    }, 1000);
  }

  return {
    link: link,
    scope: {
    name: "=",
    format: "="
    	
    }
  };
}]);