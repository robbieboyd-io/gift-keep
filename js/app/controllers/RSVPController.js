var RSVPController = function($scope, $firebase, $rootScope)
{

    $scope.isLoggedIn = false;

    $rootScope.$watch('isLoggedIn', function()
    {
        $scope.isLoggedIn = $rootScope.isLoggedIn;
    });

    $scope.RSVPController = function()
    {

    }();
}