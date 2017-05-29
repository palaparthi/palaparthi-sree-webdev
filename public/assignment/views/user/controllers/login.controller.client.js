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
           var user = userService.findUserByCredentials(username,password);

           if (user !== null){

                $location.url('/user/'+user._id)
            }
            else{
               model.message='Invalid Credentials'
            }


        }


    }


}) ();