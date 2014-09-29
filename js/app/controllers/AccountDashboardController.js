var AccountDashboardController = function($scope, $location, $rootScope)
{
    $rootScope.$watch('isLoggedIn', function()
    {
        $scope.isLoggedIn = $rootScope.isLoggedIn;
    });

    $scope.newPassword;
    $scope.oldPassword;
    $scope.emailAddress;
    $scope.updatedSuccessfully = false;
    $scope.passwordChangeErrorMessage = '';

    $scope.resetInputs = function()
    {
        $("#emailAddressGroup").removeClass('has-error');
        $("#oldPassGroup").removeClass('has-error');
        $("#newPassGroup").removeClass('has-error');
    }

    $scope.clickChangePassword = function()
    {
        $scope.changePassword();

        return false;
    }

    $scope.changePassword = function()
    {
        $scope.resetInputs();

        $scope.newPassword = $('#newPass').val();
        $scope.oldPassword = $('#oldPass').val();
        $scope.emailAddress = $('#emailAddress').val();

        $rootScope.authClient.changePassword($scope.emailAddress, $scope.oldPassword, $scope.newPassword, function(error) {
            if (error === null) {
                console.log("Password changed successfully");

                $scope.passwordChangeErrorMessage = '';
                $scope.updatedSuccessfully = true;

                if(!$scope.$$phase) $scope.$apply();
            } else {
                console.log("Error changing password:", error);

                $scope.updatedSuccessfully = false;
                switch(error.code)
                {
                    case "INVALID_EMAIL" :
                        $scope.passwordChangeErrorMessage = "Invalid email address specified";
                        break;

                    case "INVALID_USER" :
                        $scope.passwordChangeErrorMessage = "That email address isn't registered";
                        break;

                    case "INVALID_PASSWORD" :
                        $scope.passwordChangeErrorMessage = "That password was incorrect";
                        break;
                }


                if(!$scope.$$phase) $scope.$apply();
            }
        });
    }

    $scope.AccountDashboardController = function()
    {

    }();
}