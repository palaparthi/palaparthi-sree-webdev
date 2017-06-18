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
            if(typeof username==='undefined')
            {
                model.err='Username is required';
            }
            else if(typeof password==='undefined' || typeof verpwd==='undefined')
            {
                model.err='Password is required';
            }
            else if(password!==verpwd)
            {
                model.err='Password do not match';
            }
            else  if(password==='')
            {
                model.err='Password should not be empty';
            }
            /*if (typeof username === 'undefined' || typeof password === 'undefined' || typeof verpwd === 'undefined'){
                model.err = 'Please make sure to fill all the fields';
                return;
            }*/
            else {
                var user = null;
                userService.findUserByUsername(username)
                    .then(renderUser, userError);


                function renderUser(user) {

                    if (user === null || typeof user === 'undefined') {

                        if (password === verpwd) {
                            user = {
                                username: username,
                                password: password
                            };
                            userService
                                .register(user)
                                .then(userCreated, userError);

                            function userCreated(user) {

                                $location.url('/profile');
                            }
                        }
                        else {
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



    }
})();
