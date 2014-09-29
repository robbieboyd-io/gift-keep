var WelcomeController = function($scope, $rootScope)
{

    $scope.url = 'https://wedding-gifts.firebaseio.com/welcome';
    $scope.fireRef = new Firebase($scope.url);

    $scope.isLoggedIn;

    $rootScope.$watch('isLoggedIn', function()
    {
        $scope.isLoggedIn = $rootScope.isLoggedIn;
        if($scope.isLoggedIn)
        {
            $scope.fireRef.on("value", function(snap) {
                var locHTML = snap.val();

                locHTML = locHTML.substring(1);
                locHTML = locHTML.substring(0, locHTML.length-1).toString();
                $('#welcome').html(locHTML);
                $scope.fireRef.off("value");
            });
        }
    });

    $scope.WelcomeController = function()
    {

    }();
}