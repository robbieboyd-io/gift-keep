'use strict';

/* Controllers */


angular.module('visaTrademeDebit.controllers', [])
  .controller('HeaderController', ['$scope', '$location', '$anchorScroll', '$window', function($scope, $location, $anchorScroll, $window) {
        $scope.gotoHowTo = function(ev) {

            ev.preventDefault();

            $('html, body').animate({
                scrollTop: $('#howToWin').offset().top
            }, 'slow');

            $window.ga('send', 'event', 'button', 'howToWin', 'Click How to win button');
            $window.ntptEventTag('ev=' + 'click_howToWin');

            return false;
        };


        $scope.HeaderController = function()
        {
               $("#howToButton").on('click', $scope.gotoHowTo);
        }();
  }]);
