resolveMe.controller('view3Ctrl', function ($scope, $state,isMobile,$log) {	
	$scope.statevalues="nothing";
	$log.debug(isMobile);
	$scope.isMobile=isMobile;
});	
