'use strict';

var d3App = angular.module('d3App', ['ngRoute', 'nvd3ChartDirectives', 'd3App.directives', 'd3App.controllers', 'ui.bootstrap', 'd3App.services'])

.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/templates/dashboard.html',
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
