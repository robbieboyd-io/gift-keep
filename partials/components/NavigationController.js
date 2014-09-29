var NavigationController = function($scope, $location, $rootScope)
{
    $scope.isActive = function(route) {
        return route === $location.path();
    }

    $rootScope.$watch('isLoggedIn', function()
    {
        $scope.isLoggedIn = $rootScope.isLoggedIn;
    });

    $scope.NavigationController = function()
    {

    }();
}