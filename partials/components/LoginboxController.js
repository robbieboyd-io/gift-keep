var LoginboxController = function($scope, $firebase, $rootScope)
{
    $scope.FORGOT_PASSWORD = 'forgot_password';
    $scope.LOGIN = 'login';

    $scope.loginViewState = $scope.LOGIN;
    $scope.passwordResetSuccess = false;

    $rootScope.isLoggedIn = false;

    $scope.url = 'https://wedding-gifts.firebaseio.com';
    $scope.firebase = new Firebase($scope.url);
    $rootScope.authClient;
    $rootScope.authUserObj;

    $scope.pass;

    $scope.resetThePassword = function()
    {
        $scope.resetInputs();

        $scope.user = $('#email').val();

        $rootScope.authClient.sendPasswordResetEmail($scope.user, function(error) {
            if (error === null) {
                console.log("Password reset email sent successfully");
                $scope.passwordResetSuccess = true;

                if(!$scope.$$phase) $scope.$apply();
            } else {
                console.log("Error sending password reset email:", error);

                switch(error.code)
                {
                    case 'INVALID_EMAIL' :
                        $("#emailGroup").addClass('has-error');
                        break;
                }
            }
        });
    }

    $scope.resetInputs = function()
    {
        $("#emailGroup").removeClass('has-error');
        $("#passwordGroup").removeClass('has-error');
    }

    $scope.loginStateSwitch = function(state)
    {
        $scope.resetInputs();

        $scope.loginViewState = state;

        return false;
    }

    $scope.login = function()
    {
        $rootScope.authClient.login('password', {
            email: $scope.user,
            password: $scope.pass
        });
    }

    $scope.clickLogin = function()
    {
        $scope.user = $('#email').val();
        $scope.pass = $('#password').val();

        $scope.login();
    }

    $scope.clickLogout = function()
    {
        console.log("Logout");
        $rootScope.authClient.logout();

        $rootScope.isLoggedIn = false;
        $scope.user = '';
        $scope.pass = '';

        $scope.loginViewState = $scope.LOGIN;
        $scope.passwordResetSuccess = false;

        if(!$rootScope.$$phase) $rootScope.$apply();
        if(!$scope.$$phase) $scope.$apply();
    }

    $scope.onLoginError = function(error)
    {
        console.log(error);

        $scope.resetInputs();

        switch(error.code)
        {
            case 'INVALID_EMAIL' :
                $("#emailGroup").addClass('has-error');
                $("#passwordGroup").addClass('has-error');
                break;

            case 'INVALID_PASSWORD' :
                $("#passwordGroup").addClass('has-error');
                break;

        }
    }

    $scope.init = function()
    {
        //console.log($('#email').val());
    }

    $scope.checkForLogin = function()
    {
        $rootScope.authClient = new FirebaseSimpleLogin($scope.firebase, function(error, user) {
            if (error) {

                $scope.onLoginError(error);

                $rootScope.isLoggedIn = false;
                $rootScope.authUserObj = null;

                if(!$rootScope.$$phase) $rootScope.$apply();

            } else if (user) {
                $rootScope.isLoggedIn = true;
                $rootScope.authUserObj = user;

                if(!$scope.$$phase) $scope.$apply();
                if(!$rootScope.$$phase) $rootScope.$apply();

                $scope.init();
            } else {
                // user is logged out

            }
        });
    }

    $scope.LoginboxController = function()
    {
        $scope.checkForLogin();
    }();
}