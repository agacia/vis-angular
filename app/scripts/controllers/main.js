'use strict';

angular.module('visAngularApp') // , ["leaflet-directive"])
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // angular.extend($scope, {
    //     mapDefault: {
    //         london: {
    //             lat: 51.505,
    //             lng: -0.09,
    //             zoom: 8
    //         },
    //         markers: {
    //             m1: {
    //                 lat: 51.505,
    //                 lng: -0.09
    //             }
    //         }
    //     }
    // });
  	var map = new MMap();
	map.initialize();
	var url = "http://bl.ocks.org/mbostock/raw/4090846/us.json";
	// var url = "data/us.json";
	map.load();
	
  });

