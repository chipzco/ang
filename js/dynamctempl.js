angular.module('resolveMe', [
  'ui.router'
])
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/parent/1/edit');

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
            "view1": {
              templateUrl: 'views/view1.html',
              controller: 'view1Ctrl',
              parent: "parentstate"
            },
            "view2": {
              templateProvider: function($http, $stateParams, OBJ) {
                var obj = OBJ.get($stateParams.objId);
                var templateName = obj.id == 1
                  ? "views/view2.html"
                  : "views/view2.second.html"
                  ;
            
                return $http
                      .get(templateName)
                      .then(function(tpl){
                        return tpl.data;
                      });
              },
              controller: 'view2Ctrl',
              parent: "parentstate"
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
  .factory('OBJ', ['$http',
    function($http) {
      return {
        get : function(id) {return {id : id}; },
      };
    }
  ]);