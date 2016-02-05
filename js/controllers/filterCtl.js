myApp.controller('filterController', ['$scope', 'emptyToEndFilter','$log',function($scope,emptyToEndFilter,$log) {
	this.greeting = 'Hola its greeting as now!';
	this.array = [
	              {name: ''},
	              {name: ''},
	              {name: ''},
	              {name: 'Tobias'},
	              {name: 'Jeff'},
	              {name: 'Brian'},
	              {name: 'Igor'},
	              {name: 'James'},
	              {name: 'Brad'}
	              
	            ];
	this.filteredArray = emptyToEndFilter(this.array, 'name');
	
	 var  present = this.array.filter(function (item) {		
         return item['name'];
     });
	 $log.debug(present);	
	
}]);	