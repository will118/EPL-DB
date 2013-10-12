'use strict';

/* Controllers */

var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function PhoneListCtrl($scope, $http) {
  $http.get('/fixturesjson').success(function(data) {
    $scope.phones = data;
  });

  $scope.orderProp = 'name';
});

teamForm.controller('TeamFormCtrl', function TeamFormCtrl($scope, $http) {
  $http.get('/formjson').success(function(data) {
    $scope.formy = data;
  });
});
