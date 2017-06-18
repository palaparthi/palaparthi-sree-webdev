/**
 * Created by Palaparthi on 5/22/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/website',{
                templateUrl: '../assignment/views/website/templates/website-list.view.client.html',
                controller: 'WebsiteListController',
                controllerAs: 'vm',
                resolve: {
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/new',{
                templateUrl: '../assignment/views/website/templates/website-new.view.client.html',
                controller: 'NewWebsiteController',
                controllerAs: 'vm',
                controllerAs: 'vm',
                resolve: {
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/:wid',{
                templateUrl: '../assignment/views/website/templates/website-edit.view.client.html',
                controller: 'EditWebsiteController',
                controllerAs: 'vm',
                controllerAs: 'vm',
                resolve: {
                    currentUser:checkLoggedIn
                }
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