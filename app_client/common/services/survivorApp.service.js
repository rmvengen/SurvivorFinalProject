(function() {

    angular
        .module('survivorApp')
        .service('GameData', gameData);

    gameData.$inject = ['$http'];

    function GameData($http) {
        //Still need to change the stuff below
        var getWeather = function(lat, lon) {
            //darkskyapi/:lat/:lon
            return $http.get('/api/darkskyapi' + '/' + lat + '/' + lon);
        };
        
        return {
            getWeather: getWeather,
        };
    }
})();
