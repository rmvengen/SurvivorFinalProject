(function() {

    angular
        .module('survivorApp')
        .controller('seasonsCtrl', seasonsCtrl);

    seasonsCtrl.$inject = ['$scope', 'SelectedData', 'GameData'];

    function seasonsCtrl($scope, SelectedData, GameData) {
        // Nasty IE9 redirect hack (not recommended)
        /*
        if (window.location.pathname !== '/') {
          window.location.href = '/#' + window.location.pathname;
        }*/
        var vm = this;
        console.log(window.location);

        vm.content = "Survivor Data";

        vm.selectedDepartureICAO = "";
        vm.selectedArrivalICAO = "";
        vm.selectedWeight = "";

        //check selected Departure
        if (SelectedData.selectedDepartureICAO !== null) {
            vm.selectedDepartureICAO = SelectedData.selectedDepartureICAO;
        }

        //check selected Arrival
        if (SelectedData.selectedArrivalICAO !== null) {
            vm.selectedArrivalICAO = SelectedData.selectedArrivalICAO;
        }

        //check selected weight
        if (SelectedData.selectedWeight !== null) {
            vm.selectedWeight = SelectedData.selectedWeight;
        }

        //refactored for Angular 1.6 - removed success/error, used Promises...
        vm.getLandingDataForWeight = function() {
            
            GameData.getClimbDataForWeight(vm.selectedWeight.weight)
                .then(function(response) {
                    //since find may select many, just return the single object
                    vm.contestantsData = response.data;
                    console.log(vm.takeoffData);
                })
                .catch(function(e) {
                    console.log(e);
                });            
        }

    }

})();
