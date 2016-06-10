angular.module('customer').controller('custCtrl', ['$scope','$log','customer-formatting-service-async', function($scope,$log,customerFormattingServiceAsync) {
	$scope.cust={firstName: 'helloname' };
	$scope.custformat="";
	customerFormattingServiceAsync.getFormattedCustomerInfo(1).then(function(data) { $scope.custformat=data; $log.debug(data); });
}]);