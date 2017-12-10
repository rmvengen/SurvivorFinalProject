(function() {

  angular
    .module('survivorApp')
    .factory('SelectedData', selectedData);


  //selectedData.$inject = ['$http'];
  //need to fix below here
  function selectedData () {
      return {
          selectedDepartureICAO : '',
          selectedArrivalICAO : '',
          selectedWeight : ''
      };
  }

})();