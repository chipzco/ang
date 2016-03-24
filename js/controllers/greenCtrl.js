myApp.controller('greenCtrl', ['$scope','$timeout','$log', function($scope,$timeout,$log) {
	var vm=this;
	vm.pricedata={};
	vm.pricedata.isDiff=true;
	vm.pricedata.conPrice=20;
	vm.pricedata.currPrice=30;
	vm.mymess="hello from green ctrl!";
	vm.pricedata.seepriceDiffplus=function(x) {
		var pd=vm.pricedata.currPrice - vm.pricedata.conPrice + x;
		return pd;
	};
	
	vm.addOne=function() {
		vm.pricedata.currPrice++;
		$log.info(vm.pricedata.currPrice);
	}
	
	
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
		var pd=vm.pricedata.currPrice - vm.pricedata.conPrice;
		alert(mess +  " pd= " + pd  + " mys mess: "  + vm.mymess);		
	};
	
	
	vm.formatPhone=function () {
		var myVal=addDashes(vm.phone);
		$log.debug(vm.phone + " formatted : " + myVal);
		vm.formattedPhone=myVal;
	}
	
	function addDashes(f)
	{
	    var f_val = f.replace(/\D[^\.]/g, "");
	    var f_value = "(" + f_val.slice(0,3)+") "+ f_val.slice(3,6) + "-"+ f_val.slice(6);
	    return f_value;
	}
	
}]);