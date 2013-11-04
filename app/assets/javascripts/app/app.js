'use strict';

var d3App = angular.module('d3App', ['ngStorage', 'ngRoute', 'nvd3ChartDirectives', 'ui.bootstrap','ui.bootstrap.tpls', 'd3App.directives', 'd3App.seasoncontrollers', 'd3App.matchcontrollers', 'd3App.liveservices', 'd3App.accountservices', 'd3App.teamservices', 'd3App.mainGraph'])

.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: '/templates/seasonmode.html',
        controller: 'SeasonModeController'
    })
    .when('/match', {
        templateUrl: '/templates/matchmode.html',
        controller: 'MatchModeController'
    })
    .otherwise({
        redirectTo: '/'
    });
});
