var InformationController = function($scope, $rootScope, $location, $anchorScroll)
{
    $scope.url = 'https://wedding-gifts.firebaseio.com/location';
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
                $('#info').html(locHTML);
                $scope.fireRef.off("value");
                $("#moreInfo").on('click', $scope.scrollTo);
            });
        }
    });
    
    $scope.scrollTo = function(ev)
    {
        var eleId = $("#"+ev.currentTarget.id).data('to');
        
        var $target = $('#' + eleId);
        var scrollPos = $target.offset().top;
        $("body,html").animate({scrollTop: scrollPos}, "slow"); 
    }
    
    $scope.InformationController = function()
    {

    }();
}