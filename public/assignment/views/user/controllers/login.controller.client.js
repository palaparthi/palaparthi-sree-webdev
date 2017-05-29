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

    /* var users=[
     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
     ];

     $scope.login=function (username, password) {
     for (var u in users){
     var user=users[u];
     if(username === user.username && password === user.password){
     console.log('Welcome ' + user.username)
     }
     else{
     console.log('invalid username or password');
     }
     }
     }*/

}) ();