var RemoveAccountController = function($scope, $firebase, $rootScope)
{
    $scope.url = 'https://wedding-gifts.firebaseio.com';
    
    $scope.confirmDisplay;

    $rootScope.$watch('isLoggedIn', function()
    {
        $scope.isLoggedIn = $rootScope.isLoggedIn;

        if($scope.isLoggedIn)
        {

        } else {
            //$scope.fireRef.off("value");
        }
    });
    
    $scope.onConfirmCheckChange = function()
    {
        console.log('change! ' + $scope.confirmDisplay);
        if($scope.confirmDisplay)
        {
            $('#confirmPassword').removeClass('hide');
        } else {
            $('#confirmPassword').addClass('hide');
        }
    }
    
    $scope.clickRemoveAccount = function()
    {
        $('#confirmPasswordGroup').removeClass('has-error');
        
        if($('#confirmCheck').is(':checked'))
        {
            $rootScope.authClient.removeUser($rootScope.authUserObj.email, $('#confirmPassword').val(), function(err) {
                
              if (err) {
                switch (err.code) {
                  case 'INVALID_USER':
                    // The specified user account does not exist.
                        //console.log();
                        break;
                  case 'INVALID_PASSWORD':
                        // The specified user account password is incorrect.
                        $('#confirmPasswordGroup').addClass('has-error');
                        break;
                  default:
                        
                        break;
                }
              } else {
                // User account deleted successfully!
                console.log('User account deleted successfully!');
                  
                $rootScope.authClient.logout();
                $rootScope.isLoggedIn = false;

                if(!$rootScope.$$phase) $rootScope.$apply();
                if(!$scope.$$phase) $scope.$apply();
              }
            });
            
            /*$scope.firebase.removeUser({
              email    : "bobtony@firebase.com",
              password : "correcthorsebatterystaple"
            }, function(err) {
              if (err) {
                /*switch (err.code) {
                  case 'INVALID_USER':
                    // The specified user account does not exist.
                  case 'INVALID_PASSWORD':
                    // The specified user account password is incorrect.
                  case default:
                        
                        
                }
              } else {
                // User account deleted successfully!
              }
            });*/
        }
    }
    
    $scope.RemoveAccountController = function()
    {
        
    }();
}