var GiftsController = function($scope, $location, $firebase, $rootScope)
{
    $scope.url = 'https://wedding-gifts.firebaseio.com/items';
    $scope.fireRef = new Firebase($scope.url);

    $scope.gifts = [];

    $rootScope.$watch('isLoggedIn', function()
    {
        $scope.isLoggedIn = $rootScope.isLoggedIn;

        if($scope.isLoggedIn)
        {
            $scope.fireRef.on("value", function(snap) {
                $scope.gifts = snap.val();

                if(!$scope.$$phase) $scope.$apply();
            });
        } else {
            $scope.fireRef.off("value");
        }
    });

    $scope.reserveThis = function(index)
    {
        var url = 'https://wedding-gifts.firebaseio.com/items/'+index.toString()+'/';
        $firebase(new Firebase(url)).$set("reserved", true);
        $firebase(new Firebase(url)).$set("uid", $rootScope.authUserObj.uid);
    }

    $scope.unreserveThis = function(index)
    {
        var url = 'https://wedding-gifts.firebaseio.com/items/'+index.toString()+'/';
        $firebase(new Firebase(url)).$set("reserved", false);
        $firebase(new Firebase(url)).$set("uid", '');
    }

    $scope.GiftsController = function()
    {

    }();
}