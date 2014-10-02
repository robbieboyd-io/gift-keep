var GiftManagementController = function($scope, $rootScope)
{

    $scope.url = 'https://wedding-gifts.firebaseio.com/items';
    $scope.fireRef = new Firebase($scope.url);

    $scope.gifts = [];
    $scope.addingNew = false;

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

    $scope.removeThisItem = function(key)
    {
        $scope.fireRef.child(key).remove();
    }

    $scope.clickAddNew = function()
    {
        $scope.addingNew = true;
    }

    $scope.clickCancel = function()
    {
        $scope.addingNew = false;
    }

    $scope.clickAddThis = function()
    {
        var numCorrect = 0;
        var validateItems = [
            $('#itemName'), $('#itemLink'), $('#itemPicture'), $('#itemFrom')
        ];

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
            itemName = $('#itemName').val();
            itemLink = $('#itemLink').val();
            itemPicture = $('#itemPicture').val();
            itemFrom = $('#itemFrom').val();

            $scope.fireRef.push({
                'from': itemFrom,
                'link': itemLink,
                'picture': itemPicture,
                'title': itemName,
                'reserved':false,
                'uid':''
            });
        }
    }

    $scope.GiftManagementController = function()
    {

    }();
}