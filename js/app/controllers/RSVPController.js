var RSVPController = function($scope, $firebase, $rootScope)
{
    $scope.RSVP_NOT_SET = "rsvp_not_set";
    $scope.RSVP_ATTENNDING = "rsvp_attending";
    $scope.RSVP_NOT_ATTENNDING = "rsvp_not_attending";

    $scope.rsvpState = $scope.RSVP_NOT_SET;

    $scope.url = '';
    $scope.fireRef;

    $scope.isLoggedIn = false;

    $scope.beingBrought = [];

    $rootScope.$watch('isLoggedIn', function()
    {
        $scope.isLoggedIn = $rootScope.isLoggedIn;

        if($scope.isLoggedIn) {
            $scope.getRSVPList();
            $scope.getIntro();
        } else {
            if($scope.fireRef) $scope.fireRef.off("value");
        }
    });

    $scope.getIntro = function()
    {
        var url = 'https://wedding-gifts.firebaseio.com/rsvpintro/';
        var firebase = new Firebase(url);
        firebase.on("value", function(snap) {
            var introHTML = snap.val();

            introHTML = introHTML.substring(1);
            introHTML = introHTML.substring(0, introHTML.length-1).toString();
            $('#rsvpIntro').html(introHTML);
            firebase.off("value");
        });
    }

    $scope.getRSVPList = function()
    {
        $scope.url = 'https://wedding-gifts.firebaseio.com/rsvplist/'+$rootScope.authUserObj.uid;
        $scope.fireRef = new Firebase($scope.url);

        $scope.fireRef.on("value", function(snap) {

            var data = snap.val();
            if(data == null) {
                $scope.rsvpState = $scope.RSVP_NOT_SET;
            } else {
                if(data.attending) {
                    $scope.rsvpState = $scope.RSVP_ATTENNDING;

                    $scope.getBringing();
                } else {
                    $scope.rsvpState = $scope.RSVP_NOT_ATTENNDING;
                }
            }

            if(!$scope.$$phase) $scope.$apply();
        });
    }

    $scope.getBringing = function()
    {
        var url = 'https://wedding-gifts.firebaseio.com/rsvplist/'+$rootScope.authUserObj.uid+'/bringing';
        var ref = new Firebase(url);
        ref.on("value", function(snap) {

            var data = snap.val();
            $scope.beingBrought = data;

            if(!$scope.$$phase) $scope.$apply();
        });
    }

    $scope.changeResponse = function()
    {
        $scope.rsvpState = $scope.RSVP_NOT_SET;

        if(!$scope.$$phase) $scope.$apply();
    }

    $scope.confirmComing = function()
    {
        $scope.fireRef.set({
            email : $rootScope.authUserObj.email,
            attending : true,
            answered : String(Date.now())
        });

        $scope.rsvpState = $scope.RSVP_ATTENNDING;
    }

    $scope.confirmNotComing = function()
    {
        $scope.fireRef.set({
            email : $rootScope.authUserObj.email,
            attending : false,
            answered : String(Date.now())
        });

        $scope.rsvpState = $scope.RSVP_NOT_ATTENNDING;
    }

    $scope.removeSomeone = function(index)
    {
        $scope.fireRef.child('bringing').child(index).remove();
    }

    $scope.addSomeone = function()
    {
        console.log($('#rsvpName').val() );
        if($('#rsvpName').val().length > 0)
        {
            console.log('Add someone');

            $scope.fireRef.child('bringing').push({
                displayName : $('#rsvpName').val()
            });

            $('#rsvpName').val('');
            $('#rsvpNameGroup').removeClass('has-error');
        } else {
            $('#rsvpNameGroup').addClass('has-error');
        }
    }

    $scope.RSVPController = function()
    {

    }();
}