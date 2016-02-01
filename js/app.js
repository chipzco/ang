var myApp = angular.module('myApp',['ui.router','angular.filter']);
myApp.config(function($stateProvider,$urlRouterProvider) {
	$stateProvider
		var home={
			name: "ho",
			url: "/",
			templateUrl: "content.html"			
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
		};
		/*
		.state('home',{
			
		})
		.state('ang',{
			
		});*/
	$stateProvider.state(home);
    $stateProvider.state(red);
    $stateProvider.state(green);
    $stateProvider.state(ang);
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



