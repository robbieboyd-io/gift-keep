var GiftSelectorController = function($scope, $rootScope)
{
    $scope.isLoggedIn = false;

    $rootScope.$watch('isLoggedIn', function()
    {
        $scope.isLoggedIn = $rootScope.isLoggedIn;

        if($scope.isLoggedIn) {

        } else {

        }
    });

    var GiftSelectorController = function()
    {

    }()
}