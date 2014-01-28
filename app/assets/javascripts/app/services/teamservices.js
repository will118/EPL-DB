var app = angular.module('d3App.teamservices', [])

app.factory('TeamFormData', function($http, $q) {
    var methods = {};
    methods.teamform = function(team) {
        var defer_teamform = $q.defer();
        $http.get('/formjson/' + team, {
            cache: true
        }).success(function(data) {
            defer_teamform.resolve(data);
        });
        return defer_teamform.promise;
    }
    methods.oppoform = function(team) {
        var defer_oppoform = $q.defer();
        $http.get('/otherformjson/' + team, {
            cache: true
        }).success(function(data) {
            defer_oppoform.resolve(data);
        });
        return defer_oppoform.promise;
    }
    return methods;
});


app.factory('MatchDetails', function($http, $q) {
    var methods = {};
    methods.prematch = function(team) {
        var defer_prematch = $q.defer();
        $http.get('/prematchjson/' + team, {
            cache: true
        }).success(function(data) {
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
        $http.get('/hometeam/' + team, {
            cache: false
        }).success(function(data) {
            defer_hometeam.resolve(data);
        });
        return defer_hometeam.promise;
    }
    methods.away = function(team) {
        var defer_awayteam = $q.defer();
        $http.get('/awayteam/' + team, {
            cache: false
        }).success(function(data) {
            defer_awayteam.resolve(data);
        })
        return defer_awayteam.promise;
    }    
    methods.awaysubs = function(team) {
        var defer_awaysubs = $q.defer();
        $http.get('/awaysubs/' + team, {
            cache: false
        }).success(function(data) {
            defer_awaysubs.resolve(data);
        })
        return defer_awaysubs.promise;
    }    
    methods.homesubs = function(team) {
        var defer_homesubs = $q.defer();
        $http.get('/homesubs/' + team, {
            cache: false
        }).success(function(data) {
            defer_homesubs.resolve(data);
        })
        return defer_homesubs.promise;
    }    
    return methods;
});
