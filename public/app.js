'use strict';


var d3App = angular.module('d3App', [ 'n3-charts.linechart' ]);


d3App.controller('AppCtrl', function AppCtrl ($scope, $http) {
  $scope.team = 'arsenal';
  $scope.options = {
    lineMode: "cardinal",
    series: [
      {y: "avg_poss", label: "Avg Poss", color: "#bcbd22"},
      {y: "shot_acc", label: "Is", color: "#17becf"},
      {y: "pass_acc", label: "Awesome", color: "#9467bd"},
      {y: "def_score", label: "Awesome", color: "#9467bd"}
    ],
    axes: {
      x: {type: "linear", key: "x"},
      y: {type: "linear"}
    },
    tooltipMode: "default"
  };

  // $scope.getCommitData = function () {
  //   $http({
  //     method: 'GET',
  //     url:'/megajson/' +
  //       $scope.team
  //   }).
  //   success(function (data) {
  //     // attach this data to the scope
  //     $scope.data = data;
  //       console.log(data) 

  //     // clear the error messages
  //     $scope.error = '';
  //   }).
  //   error(function (data, status) {
  //     if (status === 404) {
  //       $scope.error = 'Not found?';
  //     } else {
  //       $scope.error = 'Error: ' + status;
  //     }
  //   });
  // };
  // // get the commit data immediately
  // $scope.getCommitData();
});

