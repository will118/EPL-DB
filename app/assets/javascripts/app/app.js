'use strict';

var d3App = angular.module('d3App', ['ngRoute', 'nvd3ChartDirectives', 'd3App.directives', 'd3App.controllers', 'ui.bootstrap', 'd3App.services'])

.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: '/templates/dashboard.html',
        controller: 'AppController',
        resolve: {
            session: function(SessionService) {
                return SessionService.getCurrentUser();
            }
        }
    })
    .when('/match', {
        templateUrl: '/templates/matchmode.html',
        controller: 'AppController',
        resolve: {
            session: function(SessionService) {
                return SessionService.getCurrentUser();
            }
        }
    })
    .when('/colours', {
        templateUrl: '/templates/colours.html',
        controller: 'AppController',
        resolve: {
            session: function(SessionService) {
                return SessionService.getCurrentUser();
            }
        }
    })
        .otherwise({
            redirectTo: '/'
        });
});
