'use strict';

angular.module('myApp', [
    'ngRoute',
    'firebase'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/gifts', {templateUrl: 'partials/views/Gifts.html', controller: 'GiftsController'});
    $routeProvider.when('/welcome', {templateUrl: 'partials/views/Welcome.html', controller: 'WelcomeController'});
    $routeProvider.when('/venue', {templateUrl: 'partials/views/Information.html', controller: 'InformationController'});
    $routeProvider.when('/rsvp', {templateUrl: 'partials/views/RSVP.html', controller: 'RSVPController'});
    $routeProvider.when('/account-details', {templateUrl: 'partials/views/AccountDashboard.html', controller: 'AccountDashboardController'});
    $routeProvider.otherwise({redirectTo: '/welcome'});
}]);
