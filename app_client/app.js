(function () {
//http://www.omdbapi.com/?t=Survivor&y=2000&apikey=8f04f045
  angular.module('survivorApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

  function config ($routeProvider, $locationProvider) {
    
    console.log("Survivor App");
    
    $routeProvider
      /*.when('/', {
        templateUrl: '/home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })*/
      .when('/', {
        templateUrl: '/survivor/survivor.view.html',
        controller: 'survivorCtrl',
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