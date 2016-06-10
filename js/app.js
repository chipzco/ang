var myApp = angular.module('myApp',['customer','ui.router','angular.filter','UtilFilter']);
myApp.config(function($stateProvider,$urlRouterProvider) {
	$stateProvider
		var home={
			name: "ho",
			url: "/",
			templateUrl: "content.html"			
		},
		
		fref={
				name: "fref",
				url: "fref",
				templateUrl: "views/fref.html",
				controller: "frefCtrl",			
				parent: "ho"
			},
		
		red={
			name: "red",
			url: "red",
			templateUrl: "red.html",
			controller: "redCtrl",			
			parent: "ho"
		},
		green={
				name: "green",
				url: "green",
				controller: "greenCtrl",
				controllerAs: "vm",
				templateUrl: "green.html",
				parent: "ho"
		},
		ang={
			name: "ang",
			url: "/ang",
			templateUrl:"ang1.htm",
			parent:"green",
			controller: "GreetingController",
			controllerAs: "gt"
		},
		filtertest={
				name: "filtertest",
				url: "/filtertest",
				templateUrl:"views/filterView.htm",
				parent:"green",
				controller: "filterController",
				controllerAs: "fc"
		},
		custrun={
				name: "custrun",
				url: "/custrun",
				templateUrl:"views/custRun.htm",
				parent:"ho",
				controller: "custCtrl"				
		}	
	 ;
		/*
		.state('home',{
			
		})
		.state('ang',{
			
		});*/
	$stateProvider.state(home);
	$stateProvider.state(fref);	
    $stateProvider.state(red);
    $stateProvider.state(green);
    $stateProvider.state(ang);
    $stateProvider.state(filtertest);
    $stateProvider.state(custrun);
    $stateProvider.state('contacts', {
    url: "/contacts/:a",	
      templateUrl: function ($stateParams){
    	 alert("hello"); 
       return $stateParams.a + '.html';
      }
    });
    $stateProvider.state('prov', {
    	url: "/prov/:a",		
    	  templateProvider: function ($timeout, $stateParams) {
    	    return $timeout(function () {
    	      return '<h1>' + $stateParams.a + '</h1>';
    	    }, 100);
    	  }
    });
    
			
})
.run(['$state','$rootScope', function ($state,$rootScope) {
    	   $state.transitionTo('ho');
    	   $rootScope.title="Angular hahaha";
 }])
;



