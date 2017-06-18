/**
 * Created by Palaparthi on 5/22/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/website/:wid/page',{
                templateUrl: '../assignment/views/page/templates/page-list.view.client.html',
                controller: 'PageListController',
                controllerAs: 'vm',
                resolve: {
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/:wid/page/new',{
                templateUrl: '../assignment/views/page/templates/page-new.view.client.html',
                controller: 'NewPageController',
                controllerAs: 'vm',
                resolve: {
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/:wid/page/:pid',{
                templateUrl: '../assignment/views/page/templates/page-edit.view.client.html',
                controller: 'EditPageController',
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