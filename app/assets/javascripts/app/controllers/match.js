'use strict';

angular.module('d3App.matchcontrollers', [])

.controller('MatchModeController', function($scope, $localStorage, $sessionStorage, $http, $timeout, focus, GeneralLiveData, LiveStatsData, TeamFormData, LiveBars, BigData, MatchDetails, HomeAwayTeam) {

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

    $scope.gotLive = false

    $scope.settingsToggle = false

    $scope.selectTeam = function(team) {
        $scope.team = team
    };

    $scope.team = $scope.$storage.favteam;

    // Filter on search, loaded from staticvalues 
    $scope.teamnames = teamnames;

    // Generic default values for instantiation
    $scope.possBar = [{
        "value": 50,
        "type": "crystal-palace"
    }, {
        "value": 50,
        "type": "arsenal"
    }];
    $scope.shotsBar = [{
        "value": 50,
        "type": "crystal-palace"
    }, {
        "value": 50,
        "type": "arsenal"
    }];

    var barposs = function(team) {
        LiveBars.poss(team).then(function(data) {
            $scope.possBar = data;
        })
    }
    var barshots = function(team) {
        LiveBars.shots(team).then(function(data) {
            $scope.shotsBar = data;
        })
    }

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
    
    $scope.xFunction = function(){
                return function(d){
                    return d[0];
                }
            }
    $scope.yFunction = function(){
        return function(d){
            return d[1];
        }
    }

    var liveposs = function(team) {
        var poss = LiveStatsData.poss(team);
        poss.then(function(data) {
            $scope.liveposs = data
        })
    };

    $scope.colourArray = ['#e8000b', '#051246']

    $scope.colorFunction = function() {
        return function(d, i) {
                return $scope.colourArray[i];
        };
    }; 

    $scope.sparkFunction = function() {
        return function(d) {
                return '#bbbbbb'
        };
    };


    var squawkajson = function(team) {
        var megajson = BigData.squawka(team)
        megajson.then(function(data) {
            $scope.megajson = data
        })
    }

    var score = function() {
        var scorePromise = GeneralLiveData.fullscores()
        scorePromise.then(function(data) {
            $scope.results = data
        })
    }
    var livescore = function() {
        var scorePromise = GeneralLiveData.livescores()
        scorePromise.then(function(data) {
            if (data.length > 3) {
                $scope.scores = data,
                $scope.gotLive = true
            };
        })
    }

    var nextfix = function() {
        var nextfixes = GeneralLiveData.nextfixtures()
        nextfixes.then(function(data) {
            $scope.nextfixtures = data
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

    var livestats = function() {
        var team = $scope.team;
        liveshot(team);
        liveposs(team);
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

    $scope.refershInterval = 5;

    setInterval(function() {
        $scope.$apply(function() {
            preMatcher($scope.prematchArray);
            nextfix();
            table();
            livescore();
            barposs($scope.team);
            barshots($scope.team);
            awaybench($scope.team);
            homebench($scope.team);
            away($scope.team);
            home($scope.team);
        })
    }, 10000);

    setInterval(function() {
        $scope.$apply(function() {
            livestats();
        })
    }, 4200);

    var updateTeamDependencies = function(team) {
        if (team == undefined) {
            return null
        } else {
            $scope.myColour = team_colour(team);
            target(team);
            awaybench(team);
            homebench(team);
            away(team);
            home(team);
            formteam(team);
            optatext(team);
            formoppo(team);
            liveposs(team);
            liveshot(team);
            barposs(team);
            barshots(team);
            corners(team);
            scorer(team);
            livescore();
            table();
            score();
            nextfix();
        }
    };
    $scope.$watch('team', updateTeamDependencies);

});
