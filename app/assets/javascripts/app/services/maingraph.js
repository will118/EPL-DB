'use strict';

var app = angular.module('d3App.mainGraph', [])

app.factory('BigData', function($http, $q) {
    var methods = {};
    methods.squawka = function(team) {
        var defer_squawka = $q.defer();
        $http.get('/megajson/' + team, {
            cache: true
        }).success(function(data) {
            defer_squawka.resolve(data);
        });
        return defer_squawka.promise;
    }
    return methods;
});