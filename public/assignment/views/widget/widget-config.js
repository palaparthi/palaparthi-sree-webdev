/**
 * Created by Palaparthi on 5/22/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/website/:wid/page/:pid/widget',{
                templateUrl: '../assignment/views/widget/templates/widget-list.view.client.html',
                controller: 'WidgetListController',
                controllerAs: 'vm',
                resolve: {
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/:wid/page/:pid/widget/new',{
                templateUrl: '../assignment/views/widget/templates/widget-chooser.view.client.html',
                controller: 'NewWidgetController',
                controllerAs: 'vm',
                resolve: {
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/:wid/page/:pid/widget/:wgid',{
                templateUrl: '../assignment/views/widget/templates/widget-edit.view.client.html',
                controller: 'EditWidgetController',
                controllerAs: 'vm',
                resolve: {
                    currentUser:checkLoggedIn
                }
            })
            .when('/website/:wid/page/:pid/widget/:wgid/search',{
                templateUrl: '../assignment/views/widget/templates/widget-flickr-search.view.client.html',
                controller: 'FlickrImageSearchController',
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