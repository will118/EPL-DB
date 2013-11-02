'use strict';

angular.module('d3App.seasoncontrollers', [])

.controller('SeasonModeController', function($scope, $localStorage, $sessionStorage, $http, $timeout, focus, GeneralLiveData, TeamFormData, BigData, MatchDetails, HomeAwayTeam) {

    $scope.$storage = $localStorage.$default({
        "badge": true,
        "leaguetable": true,
        "prematch": true,
        "oppoform": true,
        "fixtures": true,
        "teams": true,
        "favteam": "Arsenal",
        "subs": true,
        "liveBars": true,
        "nextFixtures": true
    });

    focus('focusMe');

    $scope.settingsToggle = false

    $scope.team = $scope.$storage.favteam;

    // Filter on search, loaded from staticvalues 
    $scope.teamnames = teamnames;

    // Generic default values for instantiation
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

    var fullscore = function() {
        var scorePromise = GeneralLiveData.fullscores()
        scorePromise.then(function(data) {
            $scope.fullscores = data
        })
    }

    var table = function() {
        var table = GeneralLiveData.table()
        table.then(function(data) {
            $scope.premtable = data
        })
    };

    var scorer = function(team) {
        var s = GeneralLiveData.scorers(team);
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


    $scope.refershInterval = 5;

    setInterval(function() {
        $scope.$apply(function() {
            preMatcher($scope.prematchArray);
            score();
            table();
        })
    }, 10000);

    var updateTeamDependencies = function(team) {
        if (team == undefined) {
            return null
        } else {
            $scope.myColour = team_colour(team);
            squawkajson(team);
            awaybench(team);
            homebench(team);
            getBadge(team);
            formteam(team);
            optatext(team);
            formoppo(team);
            scorer(team);
            away(team);
            home(team);
            fixt(team);
            fullscore();
            table();
        }
    };
    $scope.$watch('team', updateTeamDependencies);

});
