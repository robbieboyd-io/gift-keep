var GiftsController = function($scope, $location, $firebase, $rootScope)
{
    $rootScope.$watch('isLoggedIn', function()
    {
        $scope.isLoggedIn = $rootScope.isLoggedIn;
    });

    $scope.url = 'https://wedding-gifts.firebaseio.com/';
    $scope.fireRef = new Firebase($scope.url);

    $scope.gifts = [];

    $scope.fireRef.on("value", function(snap) {
        $scope.data = snap.val();

        $scope.gifts = $scope.data['items'];

        if(!$scope.$$phase) $scope.$apply();
    });

    $scope.loadData = function()
    {

    }

    $scope.reserveThis = function(index)
    {
        console.log(index);

        var url = 'https://wedding-gifts.firebaseio.com/items/'+index.toString()+'/';
        $firebase(new Firebase(url)).$set("reserved", true);
    }

    $scope.unreserveThis = function(index)
    {
        console.log(index);

        var url = 'https://wedding-gifts.firebaseio.com/items/'+index.toString()+'/';
        $firebase(new Firebase(url)).$set("reserved", false);
    }

    $scope.GiftsController = function()
    {
        //$scope.fireRef = new Firebase($scope.url);


    }();
}