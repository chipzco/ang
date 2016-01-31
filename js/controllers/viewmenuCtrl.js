resolveMe.controller('viewmenuCtrl', function ($scope,contentService) {	
	
	$scope.message="THIS IS IT NOW";
	$scope.mydata=contentService.data;
	
	
	$scope.changeme=function() {
		$scope.mydata.sharedUsers[0].ison=!$scope.mydata.sharedUsers[0].ison;
		$scope.mydata.sharedUsers[1].ison=true;
	}
	
});	
