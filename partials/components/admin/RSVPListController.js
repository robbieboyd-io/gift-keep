var RSVPListController = function($scope, $firebase, $rootScope)
{
    $scope.url = '';
    $scope.fireRef;

    $scope.isLoggedIn = false;

    $scope.rsvps = [];

    $rootScope.$watch('isLoggedIn', function()
    {
        $scope.isLoggedIn = $rootScope.isLoggedIn;

        if($scope.isLoggedIn) {
            $scope.url = 'https://wedding-gifts.firebaseio.com/rsvplist/';
            $scope.fireRef = new Firebase($scope.url);

            $scope.fireRef.on("value", function(snap) {

                var data = snap.val();
                $scope.rsvps = data;

                if(!$scope.$$phase) $scope.$apply();
            });
        } else {

        }
    });

    $scope.amountBringing = function(list)
    {
        var count = 0;
        for(var obj in list) {
            count++;
        }

        return count + 1;
    }

    $scope.RSVPListController = function()
    {

    }();
}