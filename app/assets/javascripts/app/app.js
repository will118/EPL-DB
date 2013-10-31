'use strict';

var d3App = angular.module('d3App', ['ngStorage', 'ngRoute', 'nvd3ChartDirectives', 'd3App.directives', 'd3App.controllers', 'ui.bootstrap', 'd3App.liveservices', 'd3App.accountservices', 'd3App.teamservices', 'd3App.mainGraph'])

.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: '/templates/dashboard.html',
        controller: 'AppController'
    })
    .when('/match', {
        templateUrl: '/templates/matchmode.html',
        controller: 'AppController'
    })
    .otherwise({
        redirectTo: '/'
    });
});
