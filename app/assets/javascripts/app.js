'use strict';

var d3App = angular.module('d3App', ['nvd3ChartDirectives', 'ui.bootstrap']);

d3App.controller('AppCtrl', function AppCtrl ($scope, $http) {
	$scope.getJsons = function () {

		$http({
				method: 'GET',
				url:'/formjson/' +
					$scope.team
			}).success(function(form) {
				$scope.form = form;
		});

		$http({
				method: 'GET',
				url:'/topscorers/' +
					$scope.team
			}).success(function(topscorers) {
				$scope.topscorers = topscorers;
		});

		$http({
				method: 'GET',
				url:'/fixturesjson/' +
					$scope.team
			}).success(function(fixtures) {
				$scope.fixtures = fixtures;
			
		});	
	}

	$scope.tableJson = function () {
					
					$http({
						method: 'GET',
						url:'/tablejson/'
					}).success(function(data) {
						$scope.table = data;
				});
			}

	$scope.liveJsons = function () {
			
					
					$http({
						method: 'GET',
						url:'/teamjson/' +
							$scope.team
					}).success(function(data) {
						$scope.liveteams = data;
						console.log($scope.liveteams);
				});

					$http({
						method: 'GET',
						url:'/possjson/' +
						$scope.team
					}).success(function(data) {
						$scope.liveposs = data;
				});

					$http({
						method: 'GET',
						url:'/targetjson/' +
							$scope.team
					}).success(function(data) {
						$scope.livetargets = data;
				});

					$http({
						method: 'GET',
						url:'/cornerjson/' +
							$scope.team
					}).success(function(data) {
						$scope.livecorners = data;
				});
					
					$http({
						method: 'GET',
						url:'/shotjson/' +
							$scope.team
					}).success(function(data) {
						$scope.liveshots = data;
				});
			}
			
	$scope.names = ["Arsenal", "Liverpool", "Chelsea", "Southampton", "Everton", "Hull City", "Manchester City", "Newcastle United", "Tottenham Hotspur", "West Bromwich Albion", "Cardiff City", "Swansea City", "Aston Villa", "Manchester United", "Stoke City", "Norwich City", "West Ham United", "Fulham", "Crystal Palace", "Sunderland"];

	$scope.team = 'West Bromwich Albion';

	
	$scope.colours = [
    {'Arsenal': '#e8000b'},
    {'Chelsea': '#063381'},
    {'West Bromwich Albion': '#090c41'},
    {'Aston Villa': '#5a0029'},
    {'Liverpool': '#c3001e'},
    {'Tottenham Hotspur': '#051246'},
    {'Manchester United': '#ce000e'},
    {'Stoke City': '#d62331'},
    {'Cardiff City': '#e5001e'},
    {'West Ham United': '#4c172d'},
    {'Crystal Palace': '#06347c'},
    {'Southampton': '#e5002e'},
    {'Newcastle United': '#666666'},
    {'Sunderland': '#e30021'},
    {'Norwich City': '#14993e'},
    {'Everton': '#073b8b'},
    {'Manchester City': '#4db1e6'},
    {'Swansea City': '#b4b4b4'},
    {'Hull City': '#f79616'},
    {'Fulham': '#000000'}
  ];

	$scope.colourman = function () {
	for (var i = 0; i < ($scope.colours).length; i++) {
	  if ($scope.colours[i][$scope.team]) {
	  		$scope.myColour = $scope.colours[i][$scope.team]	
	  	} 
		}
	};

	$scope.getBadge = function () {
		$scope.badgehash = ($scope.team.replace(/ /g,"_") + ".png")
	};

	var colorArray = ['#d75054','#0080ff'];

	$scope.colorFunction = function() {
	return function(d, i) {
    	return colorArray[i];
    };
	}

	$scope.$watch('team', function(team) {
			 $scope.team = team;
			 $scope.getMegaJson();
			 $scope.liveJsons();
			 $scope.colourman();
			 $scope.getBadge();
			 $scope.getJsons()
	});

	$scope.getMegaJson = function () {
		$http({
			method: 'GET',
			url:'/megajson/' +
				$scope.team
		}).
		success(function (data) {
			$scope.megajson = data;
			$scope.error = '';
		}).
		error(function (data, status) {
			if (status === 404) {
				$scope.error = 'Not found?';
			} else {
				$scope.error = 'Error: ' + status;
			}
		});
	};
	$scope.liveJsons();
	$scope.tableJson();
});

