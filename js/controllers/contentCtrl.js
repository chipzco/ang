resolveMe.controller('contentCtrl',['contentService','$scope', '$state','isMobile','$log', function (contentService,$scope, $state,isMobile,$log) {	
	$scope.statevalues="nothing";
	$log.debug(isMobile);
	$scope.isMobile=isMobile;
	$scope.sdata=contentService.data;
	$scope.seex=contentService.seex;
	$log.debug($scope.sdata);
}])
.factory('contentService',['isMobile',function(isMobile) {
	var data={x:5,sharedUsers:[] };
		
	var seex=function() {
		return data.x;
	}
	
	var initme=function() {
		data.sharedUsers.push({x:5,y:9,ison:false});
		data.sharedUsers.push({x:15,y:19,ison:false});
	}
	
	
	
	return  {
		  data:data,
		  seex:seex,
		  initme:initme
	  }
	  	  
  }])
.run(function(contentService) {
	contentService.initme();
})
;	
