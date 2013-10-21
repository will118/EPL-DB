'use strict';

var app = angular.module('d3App')
app.factory('GeneralLiveData', function ($http, $q) {
		var methods = {};

		methods.table = function () {				
		var defer_table = $q.defer();
			$http.get('/tablejson/').success(function(data) {
				defer_table.resolve(data);
			});
			return defer_table.promise;
		}

		methods.scores = function () {				
			var defer_scores = $q.defer();
			$http.get('/scoresjson/').success(function(data) {
				defer_scores.resolve(data);
			});
			return defer_scores.promise;
		}

		methods.fixtures = function (team) {				
			var deferred = $q.defer();
			$http.get('/fixturesjson/' + team).success(function(data) {
				deferred.resolve(data);
			});
			return deferred.promise;
		}
	return methods;
});

app.factory('LiveStatsData', function ($http, $q) {
		var methods = {};
		methods.scorers = function (team) {	
			var defer_topscorers = $q.defer();
			$http.get('/topscorers/' + team).success(function(data) {
				 defer_topscorers.resolve(data);
			});
			return defer_topscorers.promise;
		}
	return methods;
});