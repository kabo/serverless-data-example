'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.readings = [
      { id: 'tmp', name: 'Air temperature' },
      { id: 'hs', name: 'Significant wave height' },
      { id: 'hx', name: 'Spectral estimate of maximum wave' },
      { id: 'tp', name: 'Peak Period' },
      { id: 'tm01', name: 'Mean wave period' },
      { id: 'tm02', name: 'Mean wave period' },
      { id: 'dp', name: 'Peak wave direction (from)' },
      { id: 'dpm', name: 'Mean direction at peak frequency (from)' },
      { id: 'hs_sw1', name: 'Significant wave height of primary swell' },
      { id: 'hs_sw8', name: 'Significant wave height of swell (> 8s)' },
      { id: 'tp_sw1', name: 'Peak period of primary swell' },
      { id: 'tp_sw8', name: 'Peak period of swell (> 8s)' },
      { id: 'dpm_sw8', name: 'Mean direction at swell peak frequency (from)' },
      { id: 'dpm_sw1', name: 'Mean direction of primary swell peak frequency' },
      { id: 'hs_sea8', name: 'Significant wave height of sea (< 8s)' },
      { id: 'hs_sea', name: 'Significant wave height of wind sea' },
      { id: 'tp_sea8', name: 'Peak period of sea (< 8s)' },
      { id: 'tp_sea', name: 'Peak period of wind sea' },
      { id: 'tm_sea', name: 'Mean period of wind sea' },
      { id: 'dpm_sea8', name: 'Mean direction at sea peak frequency (from)' },
      { id: 'dpm_sea', name: 'Mean direction at wind sea peak frequency (from)' },
      { id: 'hs_ig', name: 'Infragravity significant wave height' },
      { id: 'hs_fig', name: 'Far infragravity wave height' },
      { id: 'wsp', name: 'Mean wind speed at 10 m' },
      { id: 'gst', name: 'Typical gust speed' },
      { id: 'wd', name: 'Wind direction (from)' },
      { id: 'wsp100', name: 'Mean wind speed at 100 m' },
      { id: 'wsp50', name: 'Mean wind speed at 50 m' },
      { id: 'wsp80', name: 'Mean wind speed at 80 m' },
      { id: 'precip', name: 'Precipitation' },
      { id: 'rh', name: 'Relative humidity' },
      { id: 'vis', name: 'Visibility' },
      { id: 'cld', name: 'Cloud cover' },
      { id: 'cb', name: 'Cloud base' },
      { id: 'csp0', name: 'Surface current speed' },
      { id: 'cd0', name: 'Surface current direction (to)' },
      { id: 'ss', name: 'Storm surge elevation' },
      { id: 'sst', name: 'Sea surface temperature' }
    ];
    $scope.reading = {id:'tmp', name:'Temperature'};
  }]);
