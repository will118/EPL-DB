'use strict';

var app = angular.module('d3App.services', [])
app.factory('GeneralLiveData', function($http, $q) {
    var methods = {};

    methods.table = function() {
        var defer_table = $q.defer();
        $http.get('/tablejson/').success(function(data) {
            defer_table.resolve(data);
        });
        return defer_table.promise;
    }

    methods.scores = function() {
        var defer_scores = $q.defer();
        $http.get('/scoresjson/').success(function(data) {
            defer_scores.resolve(data);
        });
        return defer_scores.promise;
    }

    methods.fixtures = function(team) {
        var deferred = $q.defer();
        $http.get('/fixturesjson/' + team).success(function(data) {
            deferred.resolve(data);
        });
        return deferred.promise;
    }
    return methods;
});

app.factory('LiveStatsData', function($http, $q) {
    var methods = {};
    methods.scorers = function(team) {
        var defer_topscorers = $q.defer();
        $http.get('/topscorers/' + team).success(function(data) {
            defer_topscorers.resolve(data);
        });
        return defer_topscorers.promise;
    }
    methods.corner = function(team) {
        var defer_corner = $q.defer();
        $http.get('/cornerjson/' + team).success(function(data) {
            defer_corner.resolve(data);
        });
        return defer_corner.promise;
    }
    methods.shot = function(team) {
        var defer_shot = $q.defer();
        $http.get('/shotjson/' + team).success(function(data) {
            defer_shot.resolve(data);
        });
        return defer_shot.promise;
    }
    methods.targets = function(team) {
        var defer_target = $q.defer();
        $http.get('/targetjson/' + team).success(function(data) {
            defer_target.resolve(data);
        });
        return defer_target.promise;
    }
    methods.colours = function(data, team) {
        var home_team = data[0]['key'];
        var away_team = data[1]['key'];
        return [team_colour(home_team), team_colour(away_team)]
    }
    return methods;
});


app.factory('TeamFormData', function($http, $q) {
    var methods = {};
    methods.teamform = function(team) {
        var defer_teamform = $q.defer();
        $http.get('/formjson/' + team).success(function(data) {
            defer_teamform.resolve(data);
        });
        return defer_teamform.promise;
    }
    methods.oppoform = function(team) {
        var defer_oppoform = $q.defer();
        $http.get('/otherformjson/' + team).success(function(data) {
            defer_oppoform.resolve(data);
        });
        return defer_oppoform.promise;
    }
    return methods;
});


app.factory('BigData', function($http, $q) {
    var methods = {};
    methods.squawka = function(team) {
        var defer_squawka = $q.defer();
        $http.get('/megajson/' + team).success(function(data) {
            defer_squawka.resolve(data);
        });
        return defer_squawka.promise;
    }
    return methods;
});

app.factory('MatchDetails', function($http, $q) {
    var methods = {};
    methods.prematch = function(team) {
        var defer_prematch = $q.defer();
        $http.get('/prematchjson/' + team).success(function(data) {
            defer_prematch.resolve(data);
        });
        return defer_prematch.promise;
    }
    return methods;
});

app.factory('HomeAwayTeam', function($http, $q) {
    var methods = {};
    methods.home = function(team) {
        var defer_hometeam = $q.defer();
        $http.get('/hometeam/' + team).success(function(data) {
            defer_hometeam.resolve(data);
        });
        return defer_hometeam.promise;
    }
    methods.away = function(team) {
        var defer_awayteam = $q.defer();
        $http.get('/awayteam/' + team).success(function(data) {
            defer_awayteam.resolve(data);
        })
        return defer_awayteam.promise;
    }
    return methods;
});

app.factory('focus', function($rootScope, $timeout) {
    return function(name) {
        $timeout(function() {
            $rootScope.$broadcast('focusOn', name);
        });
    }
});

app.factory('SessionService', function($http, $q) {
    var service = {
        getCurrentUser: function() {
            if (service.isAuthenticated()) {
                return $q.when(service.currentUser);
            } else {
                return $http.get('/api/current_user').then(function(response) {
                    return service.currentUser = response.data;
                });
            }
        },
        currentUser: null,
        isAuthenticated: function() {
            return !!service.currentUser;
        }
    };
    return service;
});
