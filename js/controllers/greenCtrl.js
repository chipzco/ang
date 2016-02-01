myApp.controller('greenCtrl', ['$scope','$timeout', function($scope,$timeout) {
	var vm=this;
	vm.pricedata={};
	vm.pricedata.isDiff=true;
	vm.pricedata.conPrice=20;
	vm.pricedata.currPrice=30;
	vm.pricedata.seepriceDiffplus=function(x) {
		var pd=vm.pricedata.currPrice - vm.pricedata.conPrice + x;
		return pd;
	};
	
	
	vm.message='';
	vm.hideDialog = function (message) {
		vm.message = message;
		vm.dialogIsHidden = true;
		$timeout(function () {
			vm.message = '';
			vm.dialogIsHidden = false;
		}, 2000);
	};
	
	vm.alert=function(mess) {
		alert(mess);		
	};
	
}]);