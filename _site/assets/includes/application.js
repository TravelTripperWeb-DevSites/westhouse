(function () {
  angular
    .module('westHouse', ['rezTrip'], function ($interpolateProvider) {
      $interpolateProvider.startSymbol('[[');
      $interpolateProvider.endSymbol(']]');
    })
    .value('rt3api', new Rt3Api({
      portalId: 'westhousehotelnewyork',
      hotelId: 'NYCWST',
      defaultLocale: 'en',
      defaultCurrency: 'USD'
    }))
    .directive('roomdetailslider', function ($q) {
      return {
        restrict: 'C',
        link: function (scope, element) {
          $(function () {
            element.flexslider({animation: "slide"});
            scope.$watch("details.photos.length", function (len) {
              if (len > 0) { //loaded
                angular.forEach(scope.details.photos, function (photo) {
                  element.data('flexslider').addSlide(
                    $('<li style="background-image:url('+ photo.large +')"></li>')
                  );
                });
                element.find("img.loader").fadeOut(1000);
                setTimeout(function () {
                  element.data('flexslider').removeSlide(0);
                }, 1000);
              }
            });
          });
        }
      };
    })
    .directive('onSearchChanged', function (rt3Search) {
      return {
        scope: false,
        restrict: 'A',
        link: function (scope, element, attrs) {
          scope.$watch('search.params', function (params) {
            if (params.arrival_date && params.departure_date) {
              scope.$eval(attrs.onSearchChanged);
            }
          }, true);
        
          scope.$eval(attrs.onSearchChanged);
        }
      };
    });

  angular.module('rezTrip', []);
})();
