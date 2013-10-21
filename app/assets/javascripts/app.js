'use strict';

var d3App = angular.module('d3App', ['nvd3ChartDirectives', 'ui.bootstrap']);

d3App.controller('AppCtrl', function AppCtrl ($scope, $http, $timeout, GeneralLiveData, LiveStatsData, TeamFormData, BigData) {

	$scope.team = 'Arsenal';

	$scope.liveJsons = function () {
		
					$http({
						method: 'GET',
						url:'/hometeam/' +
							$scope.team
					}).success(function(data) {
						$scope.hometeam = data;
						if (data && data[0]!=undefined) {
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
						if (data && data[0]!=undefined) {
							$scope.awayteamname	= data[0]['teamname'];
						};
				});

					$http({
						method: 'GET',
						url:'/targetjson/' +
							$scope.team
					}).success(function(data) {
						$scope.livetargets = data;
						if (data[0]['key'] == $scope.team ) {
							$scope.myliveteam = data[0]['key'];
							$scope.otherliveteam = data[1]['key'];
						};
						if (data[1]['key'] == $scope.team ) {
							$scope.myliveteam = data[1]['key'];
							$scope.otherliveteam = data[0]['key'];
						};
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
			
	$scope.teamnames = ["Arsenal", "Liverpool", "Chelsea", "Southampton", "Everton", "Hull City", "Manchester City", "Newcastle United", "Tottenham Hotspur", "West Bromwich Albion", "Cardiff City", "Swansea City", "Aston Villa", "Manchester United", "Stoke City", "Norwich City", "West Ham United", "Fulham", "Crystal Palace", "Sunderland"];


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
	  	};
  	if ($scope.colours[i][$scope.otherliveteam]) {
	  		$scope.otherLiveColour = $scope.colours[i][$scope.otherliveteam];  	
				$scope.colorArray = [$scope.myLiveColour,$scope.otherLiveColour];
				
	  	};
	  if ($scope.colours[i][$scope.team]) {
	  		$scope.myColour = $scope.colours[i][$scope.team];
	  		$scope.myLiveColour = $scope.colours[i][$scope.myliveteam];  	
				$scope.colorArray = [$scope.otherLiveColour,$scope.myLiveColour];
	  	}
		}
	};


	$scope.colorFunction = function() {
	return function(d, i) {
    	return $scope.colorArray[i];
    };
	}

	$scope.getBadge = function () {
		$scope.badgehash = ($scope.team.replace(/ /g,"_") + ".png")
	};


	$scope.$watch('team', function(team) {
			$scope.team = team;
			$scope.getMegaJson();
			$scope.liveJsons();
			$scope.colourman();
			$scope.getBadge();
			formteam(team);
			formoppo(team);
			scorer(team);
			fixt(team);
			table();
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

	var score = function () {
			var scorePromise = GeneralLiveData.scores()
			scorePromise.then(function(data) {
				$scope.scores = data
			})
		}

	var table = function () {
			var table = GeneralLiveData.table()
			table.then(function(data) {
				$scope.premtable = data
			})
		}

	var scorer = function(team) {
			var s = LiveStatsData.scorers(team);
			s.then(function(data) {
				$scope.scorers = data;
			})
		}

	var fixt = function(team) {
			var fixture = GeneralLiveData.fixtures(team);
			fixture.then(function(data) {
				$scope.fixtures = data
			})
		}

	var formteam = function(team) {
			var teamform = TeamFormData.teamform(team);
			teamform.then(function(data) {
				$scope.form = data
			})
		}

	var formoppo = function(team) {
			var oppoform = TeamFormData.oppoform(team);
			oppoform.then(function(data) {
				$scope.otherform = data
			})
		}

	score();

	setInterval(function(){
            $scope.$apply(function(){
                $scope.liveJsons();
								$scope.colourman();
                score();
            })
        }, 10000);
});

