angular.module('rezTrip')
  .filter('isArray', [function() {
    return function(input) {
      return angular.isArray(input);
    };
  }])
  .filter('noFractionCurrency', [function() {
    return function(input) {
        var sum = input ? input.toString().split('.') : [input];
        
        return sum[0];
    }
  }]);
