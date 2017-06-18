/**
 * Created by Palaparthi on 5/22/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('LoginController', LoginController);

    function LoginController($location, userService) {

        var model = this; //instead of using $scope we bind scope to instance of the controller

        //event handlers
        model.login = login;

        function login(username, password) {
            if(typeof username==='undefined' && typeof password==='undefined')
            {
                model.message='Username and password are required';
            }
            else if(typeof username==='undefined')
            {
                model.message='Username required';
            }
            else if(typeof password==='undefined')
            {
                model.message='Password required';
            }
            else {
                userService.login(username, password)
                    .then(loginUser, loginError);
            }

                function loginUser(user) {
                    if (user === null) {
                        model.message = 'Invalid Credentials'
                    }
                    else {
                        $location.url('/profile')
                    }
            }

            function loginError(user) {
                model.message="Invalid Credentials";
            }

        }
    }


}) ();