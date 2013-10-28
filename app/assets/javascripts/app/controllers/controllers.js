'use strict';

angular.module('d3App.controllers', [])

.controller('AppController', function($scope, $http, $timeout, focus, session, GeneralLiveData, SessionService, LiveStatsData, TeamFormData, LiveBars, BigData, MatchDetails, HomeAwayTeam) {

    focus('focusMe');

    $scope.settingsToggle = false

    $scope.user = session.user;
    // Default values for new users.
    $scope.checkModel = {"badge":true,"leaguetable":true,"prematch":false,"oppoform":true,"fixtures":true,"teams":true,"favteam":"Arsenal","subs":true,"liveBars":true}
    
    $scope.checkModel = angular.fromJson(session.user.settings);

    $scope.team = $scope.checkModel.favteam;

    $scope.updateprefs = function() {
        $scope.user.settings = angular.toJson($scope.checkModel)
        $http({
            url: '/api/settings',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.user
        }).success(function(data) {

        }).error(function(reason) {
            console.log(reason);
        });
    };

    // Filter on search, loaded from staticvalues 
    $scope.teamnames = teamnames;

    // Generic default values for instantiation
    $scope.possBar = [{"value":50,"type":"crystal-palace"},{"value":50,"type":"arsenal"}];
    $scope.shotsBar = [{"value":50,"type":"crystal-palace"},{"value":50,"type":"arsenal"}];

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
        var team = $scope.team;
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


    $scope.refershInterval = 5;

    setInterval(function() {
        $scope.$apply(function() {
            preMatcher($scope.prematchArray);
            livestats();
            score();
            nextfix();
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

    var updateTeamDependencies = function(team) {
        $scope.myColour = team_colour(team);
        target(team);
        squawkajson(team);
        awaybench(team);
        homebench(team);
        getBadge(team);
        formteam(team);
        optatext(team);
        formoppo(team);
        liveshot(team);
        barposs(team);
        barshots(team);
        corners(team);
        scorer(team);
        away(team);
        home(team);
        fixt(team);
        table();
        score();
        nextfix();
    };
    $scope.$watch('team', updateTeamDependencies);

    updateTeamDependencies($scope.team);
});
