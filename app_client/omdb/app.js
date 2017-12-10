(function () {

  angular.module('survivorApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

  function config ($routeProvider, $locationProvider) {
    
    console.log("BEING AIRPLANE SERVICES APP - MEAN STACK DRIVEN");
    
    $routeProvider
      .when('/', {
        templateUrl: '/home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/contestants/', {
        templateUrl: '/contestants/contestants.view.html',
        controller: 'contestantsCtrl',
        controllerAs: 'vm'
      })
      .when('/seasons/', {
        templateUrl: '/seasons/seasons.view.html',
        controller: 'tribesCtrl',
        controllerAs: 'vm'
      })
      .when('/tribes/', {
        templateUrl: '/tribes/tribes.view.html',
        controller: 'tribesCtrl',
        controllerAs: 'vm'
      })
      .when('/survivor/', {
        templateUrl: '/survivor/survivor.view.html',
        controller: 'survivorCtrl',
        controllerAs: 'vm'
      })
      .when('/omdb/', {
        templateUrl: '/omdb/omdb.view.html',
        controller: 'omdbCtrl',
        controllerAs: 'vm'
      })      
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(
      {
        enabled: true,
        requireBase: false,
        rewriteLinks: true
      }
    );
  }

  angular
    .module('survivorApp')
    .config(['$routeProvider', '$locationProvider', config]);

})();