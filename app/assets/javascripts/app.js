'use strict';

var d3App = angular.module('d3App', ['nvd3ChartDirectives', 'ui.bootstrap']);

d3App.controller('AppCtrl', function AppCtrl ($scope, $http, $timeout, GeneralLiveData, LiveStatsData, TeamFormData, BigData, MatchDetails) {

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
			
	$scope.refershInterval = 5;

	$scope.counter = 0;

	var preMatcher = function (data) {
			$scope.prematchsing = data[$scope.counter];
			if ($scope.counter == 9) {
				$scope.counter = 0
			} 
      $scope.counter++;
  };

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


	$scope.teamnames = teamnames
	$scope.colours = colours

	$scope.$watch('team', function(team) {
			$scope.team = team;
			$scope.liveJsons();
			$scope.colourman();
			$scope.getBadge();
			squawkajson(team);
			formteam(team);
			optatext(team);
			formoppo(team);
			scorer(team);
			fixt(team);
			table();
	});

	var squawkajson = function(team) {
			var megajson = BigData.squawka(team)
			megajson.then(function(data) {
				$scope.megajson = data
			})
		}


	var score = function () {
			var scorePromise = GeneralLiveData.scores()
			scorePromise.then(function(data) {
				$scope.scores = data
			})
		}
	score();
	

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

	var optatext = function(team) {
			var prematch = MatchDetails.prematch(team);
			prematch.then(function(data) {
				return preMatcher(data);
			})
		}

	$scope.liveJsons();
	
	setInterval(function(){
            $scope.$apply(function(){
                $scope.liveJsons();
								$scope.colourman();
                score();
            })
        }, 10000);
});

