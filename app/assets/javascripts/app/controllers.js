'use strict';

angular.module('d3App.controllers', [])

.controller('AppController', function($scope, $http, $timeout, focus, session, GeneralLiveData, SessionService, LiveStatsData, TeamFormData, BigData, MatchDetails, HomeAwayTeam) {

    focus('focusMe');

    $scope.settingsToggle = false

    $scope.leftPanelEnable = true

    $scope.user = session.user;

    $scope.checkModel = angular.fromJson(session.user.settings);

    $scope.updateprefs = function() {
        $scope.user.settings = angular.toJson($scope.checkModel)
        $http({
            url: '/api/settings',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: $scope.user
        }).success(function(data) {

        }).error(function(reason) {
            console.log(reason);
        });
    };

    $scope.team = $scope.checkModel.favteam;

    $scope.$watch('checkModel', function(data) {
        if ($scope.checkModel.fixtures == false && $scope.checkModel.teams == false) {
            $scope.leftPanelEnable = false
        } else {
            $scope.leftPanelEnable = true
        }
    });

    $scope.teamnames = teamnames

    $scope.$watch('team', function(team) {
        $scope.myColour = team_colour(team);
        $scope.team = team;
        target(team);
        squawkajson(team);
        awaybench(team);
        homebench(team);
        getBadge(team);
        formteam(team);
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

    var homebench = function(team) {
        var homesubs = HomeAwayTeam.homesubs(team);
        homesubs.then(function(data) {
                $scope.homesubs = data;
        })
    }

    var awaybench = function(team) {
        var awaysubs = HomeAwayTeam.awaysubs(team);
        awaysubs.then(function(data) {
                $scope.awaysubs = data;
        })
    }


    var target = function(team) {
        LiveStatsData.targets(team).then(function(data) {
            $scope.livetargets = data;
            $scope.colourArray = LiveStatsData.colours(data, team);
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
            return $scope.colourArray[i];
        };
    }


    var squawkajson = function(team) {
        var megajson = BigData.squawka(team)
        megajson.then(function(data) {
            $scope.megajson = data
        })
    }

    var score = function() {
        var scorePromise = GeneralLiveData.scores()
        scorePromise.then(function(data) {
            $scope.scores = data
        })
    }
    score();

    var table = function() {
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
            $scope.prematchArray = data
            preMatcher(data);
        })
    };

    var livestats = function() {
        var team = $scope.team
        liveshot(team);
        corners(team);
        target(team);
    };

    $scope.counter = 0;
    var preMatcher = function(data) {
        $scope.prematchsing = data[$scope.counter];
        if ($scope.counter == 9) {
            $scope.counter = 0
        }
        $scope.counter++;
    };

    var getBadge = function(team) {
        $scope.badgehash = (team.replace(/ /g, "_") + ".png")
    };

    setInterval(function() {
        $scope.$apply(function() {
            preMatcher($scope.prematchArray);
            livestats();
            score();
            table();
        })
    }, 10000);

    $scope.signout = function() {
        $http({
            url: '/users/sign_out',
            method: 'DELETE',
            data: {
                user: $scope.user
            }
        }).success(function(data) {}).error(function(reason) {
            $scope.user.errors = reason;
            window.location.href = '/';
        });
    };


    $scope.refershInterval = 5;

});
