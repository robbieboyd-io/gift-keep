'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngRoute',
    'firebase'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/gifts', {templateUrl: 'partials/views/Gifts.html', controller: 'GiftsController'});
    $routeProvider.when('/about', {templateUrl: 'partials/views/About.html', controller: 'AboutController'});
    $routeProvider.when('/more-information', {templateUrl: 'partials/views/Information.html', controller: 'InformationController'});
    $routeProvider.when('/account-details', {templateUrl: 'partials/views/AccountDashboard.html', controller: 'AccountDashboardController'});
    $routeProvider.otherwise({redirectTo: '/gifts'});
}]);
