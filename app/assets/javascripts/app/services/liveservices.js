'use strict';

var app = angular.module('d3App.liveservices', [])

app.factory('LiveBars', function($http, $q) {
    var methods = {};
    methods.poss = function(team) {
        var defer_poss = $q.defer();
        $http.get('/livepossbar/' + team, {
            cache: false
        }).success(function(data) {
            defer_poss.resolve(data);
        });
        return defer_poss.promise;
    }
    methods.shots = function(team) {
        var defer_shots = $q.defer();
        $http.get('/liveshotsbar/' + team, {
            cache: false
        }).success(function(data) {
            defer_shots.resolve(data);
        });
        return defer_shots.promise;
    }
    return methods;
});

app.factory('GeneralLiveData', function($http, $q) {
    var methods = {};

    methods.table = function() {
        var defer_table = $q.defer();
        $http.get('/tablejson/', {
            cache: true
        }).success(function(data) {
            defer_table.resolve(data);
        });
        return defer_table.promise;
    }

    methods.scores = function() {
        var defer_scores = $q.defer();
        $http.get('/scoresjson/', {
            cache: false
        }).success(function(data) {
            defer_scores.resolve(data);
        });
        return defer_scores.promise;
    }

    methods.nextfixtures = function() {
        var defer_nextfixtures = $q.defer();
        $http.get('/nextfixtures/' + 'countdown', {
            cache: false
        }).success(function(data) {
            defer_nextfixtures.resolve(data);
        });
        return defer_nextfixtures.promise;
    }

    methods.fixtures = function(team) {
        var deferred = $q.defer();
        $http.get('/fixturesjson/' + team, {
            cache: true
        }).success(function(data) {
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
        $http.get('/topscorers/' + team, {
            cache: false
        }).success(function(data) {
            defer_topscorers.resolve(data);
        });
        return defer_topscorers.promise;
    }
    methods.corner = function(team) {
        var defer_corner = $q.defer();
        $http.get('/cornerjson/' + team, {
            cache: false
        }).success(function(data) {
            defer_corner.resolve(data);
        });
        return defer_corner.promise;
    }
    methods.shot = function(team) {
        var defer_shot = $q.defer();
        $http.get('/shotjson/' + team, {
            cache: false
        }).success(function(data) {
            defer_shot.resolve(data);
        });
        return defer_shot.promise;
    }
    methods.targets = function(team) {
        var defer_target = $q.defer();
        $http.get('/targetjson/' + team, {
            cache: false
        }).success(function(data) {
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
