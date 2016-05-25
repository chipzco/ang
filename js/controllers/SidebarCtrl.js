myApp.controller('SidebarCtrl', function ($scope, $state) {
	$scope.content = ['red', 'green', 'blue','fref'];
	$scope.setPage = function (page) {
		$state.transitionTo(page);
	};
});	
