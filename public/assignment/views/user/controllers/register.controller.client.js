/**
 * Created by Palaparthi on 5/26/17.
 */
(function (){
    angular
        .module('WebAppMaker')
        .controller('RegisterController', RegisterController);

    function RegisterController($location, userService) {
        var model = this;
        var err = null;

        //event handlers
        model.register = register;

        function register(username, password, verpwd) {
            if (typeof username === 'undefined' || typeof password === 'undefined' || typeof verpwd === 'undefined'){
                model.err = 'Please make sure to fill all the fields';
                return;
            }
            var user = null;
            userService.findUserByUsername(username)
                .then (renderUser, userError);


            function renderUser(user) {

                if(user===null || typeof user === 'undefined'){

                    if(password === verpwd){
                        user = {
                            username : username,
                            password : password
                        };
                        userService
                            .createUser(user)
                            .then(userCreated, userError);

                        function userCreated(user) {

                            $location.url('/user/' + user._id);
                        }
                    }
                    else{
                        model.err = 'Please make sure that passwords match !'
                    }
                }
                else model.err = 'User already exists. Try another username !!';

            }

            function userError(user) {
                model.err = 'Error';


            }
        }



    }
})();
