'use strict';

var d3App = angular.module('d3App', ['nvd3ChartDirectives', 'ui.bootstrap']);

d3App.controller('AppCtrl', function AppCtrl ($scope, $http, $timeout, GeneralLiveData, LiveStatsData, TeamFormData, BigData, MatchDetails, HomeAwayTeam) {

	$scope.team = 'Arsenal';

	$scope.teamnames = teamnames

	$scope.$watch('team', function(team) {
			$scope.myColour = team_colour(team);
			$scope.team = team;
			squawkajson(team);
			getBadge(team);
			formteam(team);
			target(team);
			optatext(team);
			formoppo(team);
			liveshot(team);
			corners(team);
			scorer(team);
			away(team);
			home(team);
			fixt(team);
			table();
	});


	var home = function(team) {
			var hometeam = HomeAwayTeam.home(team);
			hometeam.then(function(data) {
				if (data && data[0] != undefined) {
					$scope.hometeam = data;
					$scope.hometeamname = data[0].teamname
				}
			})
		}

	var away = function(team) {
			var awayteam = HomeAwayTeam.away(team);
			awayteam.then(function(data) {
				if (data && data[0] != undefined) {
					$scope.awayteam = data;
					$scope.awayteamname = data[0].teamname
				}
			})
		}

	var target = function(team) {
			LiveStatsData.targets(team).then(function(data) {
				$scope.livetargets = data;
				$scope.colorArray = LiveStatsData.colours(data, team);
			})
		}

	var corners = function(team) {
			var corner = LiveStatsData.corner(team)
			corner.then(function(data) {
				$scope.livecorners = data
				

			})
	}

	var liveshot = function(team) {
		var liveshots = LiveStatsData.shot(team);
		liveshots.then(function(data) {
			$scope.liveshots = data
				

		})
	};


	$scope.colorFunction = function() {
		return function(d, i) {
	    	return $scope.colorArray[i];
	    };
	}


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
	};

	var scorer = function(team) {
			var s = LiveStatsData.scorers(team);
			s.then(function(data) {
				$scope.scorers = data;
			})
	};

	var fixt = function(team) {
			var fixture = GeneralLiveData.fixtures(team);
			fixture.then(function(data) {
				$scope.fixtures = data
			})
	};

	var formteam = function(team) {
			var teamform = TeamFormData.teamform(team);
			teamform.then(function(data) {
				$scope.form = data
			})
	};

	var formoppo = function(team) {
			var oppoform = TeamFormData.oppoform(team);
			oppoform.then(function(data) {
				$scope.otherform = data
				$scope.otherColour = team_colour(data[0]['team'])
			})
	};

	var optatext = function(team) {
			var prematch = MatchDetails.prematch(team);
			prematch.then(function(data) {
				preMatcher(data);
			})
	};


	$scope.counter = 0;
	var preMatcher = function (data) {
			$scope.prematchsing = data[$scope.counter];
			if ($scope.counter == 9) {
				$scope.counter = 0
			} 
      $scope.counter++;
  };

	var getBadge = function (team) {
		$scope.badgehash = (team.replace(/ /g,"_") + ".png")
	};

	setInterval(function(){
            $scope.$apply(function(){
                score();
                table();
            })
        }, 10000);
	
	$scope.refershInterval = 5;

});