myApp.controller('filterController', ['$scope', 'emptyToEndFilter','orderByFilter','yesnoFilter','$log',function($scope,emptyToEndFilter,orderByFilter,yesnoFilter,$log) {
	this.greeting = 'Hola its greeting as now!';
	this.array = [
	              {name: '',date: new Date("2015-03-25T12:00:01")},
	              {name: '',date: new Date("2016-03-25T12:00:01")},
	              {name: '',date: new Date("2017-03-25T12:00:01")},
	              {name: 'Tobias',date: new Date("2016-02-25T12:00:01")},
	              {name: 'Jeff',date: new Date("2015-03-25T23:00:01")},
	              {name: 'Brian',date: new Date("2015-03-25T16:00:01")},
	              {name: 'Igor',date: new Date("2015-03-25T15:00:01")},
	              {name: 'James',date: new Date("2015-03-25T13:00:01")},
	              {name: 'Brad',date: new Date("2015-03-25T17:00:01")}
	              
	 
	              ];
	this.rev=false;
	this.sortcol='name';
	this.filteredArray =[];
	this.revsort=function () {
		this.rev=!this.rev;
		//alert(this.rev);
		this.filteredArray = emptyToEndFilter(orderByFilter(this.array, this.sortcol,this.rev),'name');
	}
	
	this.sortby=function () {		
		this.filteredArray = emptyToEndFilter(orderByFilter(this.array, this.sortcol,this.rev),'name');
	}
	
	
	
	 var  present = this.array.filter(function (item) {		
         return item['name'];
     });
	 $log.debug(present);	



	$scope.valuetoTest="Hello";

	$scope.testedvalue= yesnoFilter(9090,'IS EQUAL','NOT EQUAL',9090) ;
}]);