(function() {

    angular
        .module('survivorApp')
        .factory('KeyStore', keyStore);

    keyStore.$inject = ['$http'];
    function keyStore($http) {
        var getOmdbUrl = function(t, y){
            return $http.get('/api/darkskyurl/' + t + '/' + y);
        }
//var omdburl = 'http://www.omdbapi.com/?t=' + t + '&y=' + y + process.env.OMDB_KEY
        return {
            getKeys: getOmdbUrl
        };
    }

})();
