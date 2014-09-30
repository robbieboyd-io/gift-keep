var AddAdminsController = function($scope, $rootScope)
{

    $scope.url = 'https://wedding-gifts.firebaseio.com/users';
    $scope.fireRef = new Firebase($scope.url);

    $rootScope.$watch('isLoggedIn', function()
    {
        $scope.isLoggedIn = $rootScope.isLoggedIn;

        if($scope.isLoggedIn)
        {

        } else {
            //$scope.fireRef.off("value");
        }
    });

    $scope.onAddUser = function()
    {
        if(!$scope.isLoggedIn) return;

        var numCorrect = 0;
        var validateItems = [ $('#displayNameInput'), $('#providerInput'), $('#providerIDInput') ];

        for(var i = 0; i < validateItems.length; i++)
        {
            if($(validateItems[i]).val().length >= 1)
            {
                $(validateItems[i]).parent().removeClass('has-error');
                numCorrect++;
            } else {
                $(validateItems[i]).parent().addClass('has-error');
            }
        }

        if(numCorrect == validateItems.length) {
            displayName = $('#displayNameInput').val();
            provider = $('#providerInput').val();
            provider_id = $('#providerIDInput').val();

            $scope.fireRef.push({
                'displayName': displayName,
                'isAdmin': true,
                'provider': provider,
                'provider_id': provider_id
            });
        }
    }

    $scope.AddAdminsController = function()
    {

    }();
}