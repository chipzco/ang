var isMobile = window.matchMedia("only screen and (max-width: 980px)").matches; //and (max-width: 980px)
//isMobile=false;
//alert(isMobile);
var temp_suffix="d.html";
if (isMobile)
	temp_suffix="m.html";
var resolveMe=angular.module('resolveMe', [
  'ui.router'
])
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/parent/1/edit');
      
      
     $stateProvider
      .state('root', {
    	url: '/root',
    	templateUrl: 'views/root.html',
    	controller: 'rootCtrl'     
      
      }).
      state('root.new', {
    	 url: '/new',
    	 views: {
    		 "viewmenu@root": { 
    			 controller: 'viewmenuCtrl' ,
    			 templateUrl: 'views/menu_' + temp_suffix
    		 },
    		 "viewmd@root": { 
    			 controller: 'viewmdCtrl' ,
    			 templateUrl: 'views/view' + temp_suffix
    		 },
    		 "viewcont@root": {
          	   templateUrl: 'views/viewcont.html'
             } 
    		 
    	 } 	 
     })
      .state('root.actual',{
    	url: '/home',
    	 views: { 
    		 "viewmenu@root": {                
                 templateProvider: function(TemplateSwitcher) {                
                     return TemplateSwitcher.provideTemplate("menu_");                             
                   },            
                 controller: 'viewmenuCtrl'              
               },
               "viewmd@root": {
            	   templateProvider: function(TemplateSwitcher) {                
                       return TemplateSwitcher.provideTemplate("view");                             
                     },            	   
                   controller: 'viewmdCtrl'              
                },
               "viewcont@root": {
            	   templateUrl: 'views/viewcont.html'
               } 
    	 }
      })     
     .state('siteHome', {
    	 url:'/site',
    	 parent: 'root.actual',    	 
    	  templateProvider: function(TemplateSwitcher) {                
    			 return TemplateSwitcher.provideTemplate("content_");
    	   }
      ,
     	controller: 'contentCtrl'
     });  
     
      $stateProvider
        .state('parentstate', {
          url: '/parent/:objId',
          //abstract: true,
          templateUrl: 'views/parentview.html',
          controller: function($scope, obj) {$scope.obj = obj},
          resolve: {
            obj: function(OBJ, $stateParams) {
              return obj = OBJ.get($stateParams.objId);
            },
          }
        });
 
      
      $stateProvider
        .state('parentstate.childs', {
          url: '/edit',
          views: {
            "view1@parentstate": {
              templateUrl: 'views/view1.html',
              controller: 'view1Ctrl'              
            },
            "view2@parentstate": {
              templateProvider: function($http, $stateParams, OBJ) {
                var obj = OBJ.get($stateParams.objId);
                var templateName = obj.id == 1
                  ? "views/view2.html"
                  : "views/view2/second.html";
            
                return $http
                      .get(templateName)
                      .then(function(tpl){
                        return tpl.data;
                      });
              },
              controller: 'view2Ctrl',             
            }
            ,
            "view3@parentstate" : {
            	 controller: 'view3Ctrl',           	
            	 templateProvider: function($http, $stateParams, isMobile) {                     
                     var templateName = isMobile == true ? "views/view3_mobile.html": "views/view3_destktop.html";   
                   //  templateName +="?i=" + Math.random();
                     return $http.get(templateName,{cache: false} ).then(function(tpl) { return tpl.data; });
                  }            	 
            }                  
          }
        });

    }
  ])
  .controller('view2Ctrl', function($scope, obj) {
    $scope.obj = obj
  })
  .controller('view1Ctrl', function($scope, obj) {
    $scope.obj = obj
  })
  .factory('OBJ', [function() {
      return {
        get : function(id) {return {id : id}; },
      };
    }
  ])
  .factory('TemplateSwitcher',['$http','isMobile',function($http,isMobile) {
	  return  {
		  provideTemplate: function(templatename) {
			  var templateName = isMobile == true ? "views/" + templatename + "m.html": "views/" + templatename + "d.html";   
			   templateName +="?i=" + Math.random();
			  return $http.get(templateName,{cache: false} ).then(function(tpl) { return tpl.data; },function() { return "not found" });
		  }
	  }	  
  }])
  .value('isMobile', isMobile);
  ;