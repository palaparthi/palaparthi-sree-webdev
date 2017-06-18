/**
 * Created by Palaparthi on 5/22/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/login',{
                templateUrl: '../assignment/views/user/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs : 'vm'
            })
            .when('/profile',{
                templateUrl: '../assignment/views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'vm',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/register',{
                templateUrl: '../assignment/views/user/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'vm'
            });
    }

    function checkLoggedIn(userService, $q,$location) {
        var deffered = $q.defer();

         userService.loggedIn()
             .then(function (user) {
                 if(user ==='0'){
                     deffered.reject();
                     $location.url('/login')
                 }
                 else{
                     deffered.resolve(user);
                 }
             });

         return deffered.promise;
    }

}) ();