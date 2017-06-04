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
            userService.findUserByCredentials(username, password)
                .then(loginUser, loginError);

            function loginUser(user) {
                if (user === null) {
                    model.message = 'Invalid Credentials'
                }
                else {
                    $location.url('/user/' + user._id)
                }


            }

            function loginError(user) {
                model.message="Error!!";
            }

        }
    }


}) ();