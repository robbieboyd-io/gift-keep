var InformationController = function($scope)
{
    $scope.url = 'https://wedding-gifts.firebaseio.com/location';
    $scope.fireRef = new Firebase($scope.url);

    $scope.fireRef.on("value", function(snap) {
        var locHTML = snap.val();

        locHTML = locHTML.substring(1);
        locHTML = locHTML.substring(0, locHTML.length-1).toString();
        $('#info').html(locHTML);
        $scope.fireRef.off("value");
    });

    $scope.InformationController = function()
    {

    }();
}