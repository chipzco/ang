(function () {
	var NAME_REGEXP = /^([^0-9]*)$/;
	myApp.directive('validName',['$log',function ($log) {
		return {
			require: 'ngModel',			
			link: function(scope, elm, attrs, ctrl) {				
				ctrl.$parsers.push(function (value) {					
					var valid=false;	
		            if (value && value.length > 2) {		                  
		                //valid=isNaN(value);
		                if (/^([^0-9]*)$/.test(value))
		                	valid=true;
		                //$log.debug(valid);		                 
		              }
		             ctrl.$setValidity('validName', valid);
		             return value;
	             });				
			}
		}
	}]);
}());