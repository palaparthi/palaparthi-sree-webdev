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
            .when('/user/:uid',{
                templateUrl: '../assignment/views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'vm'
            })
            .when('/register',{
                templateUrl: '../assignment/views/user/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'vm'
            });
    }

}) ();