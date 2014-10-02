var GiftsController = function($scope, $location, $firebase, $rootScope)
{
    $scope.url = 'https://wedding-gifts.firebaseio.com/items';
    $scope.fireRef = new Firebase($scope.url);

    $scope.gifts = [];

    $scope.masonaryForIE = function()
    {
        // IE <= 9 doesn't support css column-count. Add masonary
        var IE = (!! window.ActiveXObject && +(/msie\s(\d+)/i.exec(navigator.userAgent)[1])) || NaN;
        if (IE <= 9)
        {
            $('#giftList').find('.gift-item').addClass('gift-item-ie');

            /*$('#giftList').masonry({
             itemSelector: '.gift-item',
             isResizable : true,
             // set columnWidth a fraction of the container width
             columnWidth: Math.ceil($('#giftList').width() / 3)
             });*/
        }

    }

    $rootScope.$watch('isLoggedIn', function()
    {
        $scope.isLoggedIn = $rootScope.isLoggedIn;

        if($scope.isLoggedIn)
        {
            $scope.fireRef.on("value", function(snap) {
                $scope.gifts = snap.val();

                if(!$scope.$$phase) $scope.$apply();


                $scope.masonaryForIE();
            });
        } else {
            $scope.fireRef.off("value");

            $scope.masonaryForIE();
        }
    });

    $scope.reserveThis = function($event, index)
    {
        $event.preventDefault();

        var url = 'https://wedding-gifts.firebaseio.com/items/'+index.toString()+'/';
        $firebase(new Firebase(url)).$set("reserved", true);
        $firebase(new Firebase(url)).$set("uid", $rootScope.authUserObj.uid);

        return false;
    }

    $scope.unreserveThis = function($event, index)
    {
        $event.preventDefault();

        var url = 'https://wedding-gifts.firebaseio.com/items/'+index.toString()+'/';
        $firebase(new Firebase(url)).$set("reserved", false);
        $firebase(new Firebase(url)).$set("uid", '');

        return false;
    }

    $scope.GiftsController = function()
    {

    }();
}