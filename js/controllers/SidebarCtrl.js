myApp.controller('SidebarCtrl', function ($scope, $state) {
	$scope.content = ['red', 'green', 'blue','fref','custrun','dirtodir'];
	$scope.setPage = function (page) {
		$state.transitionTo(page);
	};
});	
