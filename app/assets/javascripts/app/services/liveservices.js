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
            cache: false
        }).success(function(data) {
            defer_table.resolve(data);
        });
        return defer_table.promise;
    };

    methods.livescores = function() {
        var defer_livescores = $q.defer();
        $http.get('/livescoresjson/', {
            cache: false
        }).success(function(data) {
            defer_livescores.resolve(data);
        });
        return defer_livescores.promise;
    };

    methods.fullscores = function() {
        var defer_fullscores = $q.defer();
        $http.get('/fullscoresjson/', {
            cache: false
        }).success(function(data) {
            defer_fullscores.resolve(data);
        });
        return defer_fullscores.promise;
    };

    methods.recent = function(team) {
        var defer_recent = $q.defer();
        $http.get('/pastresults/' + team, {
            cache: false
        }).success(function(data) {
            defer_recent.resolve(data);
        });
        return defer_recent.promise;
    };

    methods.diff = function(team1, team2, diffSetting) {
        var defer_diff = $q.defer();
        $http.get('/diffjson/' + team1 + '$' + team2 + '$' + diffSetting, {
            cache: false
        }).success(function(data) {
            defer_diff.resolve(data);
        });
        return defer_diff.promise;
    };

    methods.nextfixtures = function() {
        var defer_nextfixtures = $q.defer();
        $http.get('/nextfixtures/' + 'countdown', {
            cache: false
        }).success(function(data) {
            defer_nextfixtures.resolve(data);
        });
        return defer_nextfixtures.promise;
    };

    methods.fixtures = function(team) {
        var deferred = $q.defer();
        $http.get('/fixturesjson/' + team, {
            cache: true
        }).success(function(data) {
            deferred.resolve(data);
        });
        return deferred.promise;
    };
    methods.scorers = function(team) {
        var defer_topscorers = $q.defer();
        $http.get('/topscorers/' + team, {
            cache: false
        }).success(function(data) {
            defer_topscorers.resolve(data);
        });
        return defer_topscorers.promise;
    };
    return methods;
});

app.factory('LiveStatsData', function($http, $q) {
    var methods = {};
    methods.poss = function(team) {
        var defer_liveposs = $q.defer();
        $http.get('/possjson/' + team, {
            cache: false
        }).success(function(data) {
            defer_liveposs.resolve(data);
        });
        return defer_liveposs.promise;
    };
    methods.corner = function(team) {
        var defer_corner = $q.defer();
        $http.get('/cornerjson/' + team, {
            cache: false
        }).success(function(data) {
            defer_corner.resolve(data);
        });
        return defer_corner.promise;
    };
    methods.shot = function(team) {
        var defer_shot = $q.defer();
        $http.get('/shotjson/' + team, {
            cache: false
        }).success(function(data) {
            defer_shot.resolve(data);
        });
        return defer_shot.promise;
    };
    methods.targets = function(team) {
        var defer_target = $q.defer();
        $http.get('/targetjson/' + team, {
            cache: false
        }).success(function(data) {
            defer_target.resolve(data);
        });
        return defer_target.promise;
    };
    methods.colours = function(data, team) {
        var home_team = data[0]['key'];
        var away_team = data[1]['key'];
        return [team_colour(home_team), away_colour_for_graph(away_team)];
    };
    return methods;
});
