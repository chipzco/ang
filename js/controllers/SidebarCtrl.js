myApp.controller('SidebarCtrl', function ($scope, $state) {
	$scope.content = ['red', 'green', 'blue'];
	$scope.setPage = function (page) {
		$state.transitionTo(page);
	};
});	
