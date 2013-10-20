'use strict';

var d3App = angular.module('d3App', ['nvd3ChartDirectives', 'ui.bootstrap']);

d3App.controller('AppCtrl', function AppCtrl ($scope, $http, $timeout) {
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
				url:'/otherformjson/' +
					$scope.team
			}).success(function(form) {
				$scope.otherform = form;
				$scope.otherteam = (form[0]['team']);

		});

		$http({
				method: 'GET',
				url:'/scoresjson/'
			}).success(function(data) {
				$scope.scorers = data;
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
						url:'/hometeam/' +
							$scope.team
					}).success(function(data) {
						$scope.hometeam = data;
						if (data) {
							$scope.hometeamname	= data[0]['teamname'];
						};
				});

					$http({
						method: 'GET',
						url:'/prematchjson/' +
							$scope.team
					}).success(function(data) {
						$scope.prematch = data;
						$scope.preMatcher();
				});

		
					$http({
						method: 'GET',
						url:'/awayteam/' +
							$scope.team
					}).success(function(data) {
						$scope.awayteam = data;
						if (data) {
							$scope.awayteamname	= data[0]['teamname'];
						};
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
						$scope.myliveteam = data[0]['key'];
						$scope.otherliveteam = data[1]['key'];
						$scope.colourman();
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

	$scope.team = 'Arsenal';

	$scope.refershInterval = 5;

	$scope.counter = 0;
	$scope.preMatcher = function () {
			$scope.prematchsing = $scope.prematch[$scope.counter];
			if ($scope.counter == 9) {
				$scope.counter = 0
			} 
      $scope.counter++;
  };

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
	  if ($scope.colours[i][$scope.otherteam]) {
	  		$scope.otherColour = $scope.colours[i][$scope.otherteam];
	  		$scope.colorFunction();	
	  	};
  	if ($scope.colours[i][$scope.otherliveteam]) {
	  		$scope.otherLiveColour = $scope.colours[i][$scope.otherliveteam];  	
				$scope.colorArray = [$scope.myLiveColour,$scope.otherLiveColour];
				$scope.colorFunction();
	  	};
	  if ($scope.colours[i][$scope.team]) {
	  		$scope.myColour = $scope.colours[i][$scope.team];
	  		$scope.myLiveColour = $scope.colours[i][$scope.myliveteam];  	
				$scope.colorArray = [$scope.myLiveColour,$scope.otherLiveColour];
				$scope.homecolorArray = [$scope.team];
				$scope.colorFunction();
				$scope.homecolorFunction();
	  	} 
		}
	};

	$scope.getBadge = function () {
		$scope.badgehash = ($scope.team.replace(/ /g,"_") + ".png")
	};



	$scope.colorFunction = function() {
	return function(d, i) {
    	return $scope.colorArray[i];
    };
	}

	$scope.homecolorFunction = function() {
	return function(d, i) {
    	return $scope.homecolorArray[i];
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
	$scope.tableJson();
	

	setInterval(function(){
            $scope.$apply(function(){
                $scope.liveJsons();
								$scope.tableJson();
								$scope.colourman();
            })
        }, 10000);
});

