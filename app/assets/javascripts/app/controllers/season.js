'use strict';

angular.module('d3App.seasoncontrollers', [])

.controller('SeasonModeController', function($scope, $localStorage, $sessionStorage, $http, $timeout, focus, GeneralLiveData, TeamFormData, BigData, MatchDetails, HomeAwayTeam) {

    $scope.diffTeam = "Manchester United";

    $scope.diffSetting = "optascore";

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
    $scope.generalView = true


    $scope.defaultCharter = function() {
        $scope.diffChart = false;
        $scope.defaultChart = true
    };
    
    $scope.diffCharter = function() {
        $scope.defaultChart = false;
        $scope.diffChart = true;
    };

    $scope.defaultCharter();

    focus('focusMe');


    $scope.selectTeam = function(team) {
        $scope.team = team
    };

    $scope.seasonResults = function() {
        recent($scope.team);
        $scope.generalView = false
    };

    $scope.generalResults = function() {
        $scope.generalView = true;
        scores();
    };

    $scope.selectForm = function(fix) {
        if (fix.home == $scope.team) {
            formoppo(fix.away);
        } else {
            formoppo(fix.home);
        };
    };

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
        var megajson = BigData.squawka(team);
        megajson.then(function(data) {
            $scope.megajson = data
        })
    }

    var scores = function() {
        var scorePromise = GeneralLiveData.fullscores();
        scorePromise.then(function(data) {
            $scope.results = data
        })
    }
    var recent = function(team) {
        var recentPromise = GeneralLiveData.recent(team);
        recentPromise.then(function(data) {
            $scope.results = data
        })
    }


    var table = function() {
        var table = GeneralLiveData.table();
        table.then(function(data) {
            $scope.premtable = data
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
        var oppoform = TeamFormData.teamform(team);
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

    var nextfix = function() {
        var nextfixes = GeneralLiveData.nextfixtures()
        nextfixes.then(function(data) {
            $scope.nextfixtures = data
        })
    };

    var diff = function(team, diffTeam, setting) {
        if ($scope.diffTeam == undefined) {
            return null
        } else {
        var recentPromise = GeneralLiveData.diff(team, diffTeam, setting);
        recentPromise.then(function(data) {
            $scope.diffData = data;
        })
        };
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
        })
    }, 10000);

    setInterval(function() {
        $scope.$apply(function() {
            table();
        })
    }, 100000);

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
            away(team);
            home(team);
            fixt(team);
            nextfix();
            scores();
            table();
            $scope.$storage.favteam = team;
        }
    };
    $scope.$watch('team', updateTeamDependencies);
    $scope.$watchCollection('[team, diffTeam, diffSetting]', function(settings){
        diff(settings[0], settings[1], settings[2]);
    });
});
