myApp.controller('greenCtrl', ['$scope', function($scope) {
	var vm=this;
	vm.pricedata={};
	vm.pricedata.isDiff=true;
	vm.pricedata.conPrice=20;
	vm.pricedata.currPrice=30;
}]);