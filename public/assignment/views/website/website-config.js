/**
 * Created by Palaparthi on 5/22/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/user/:uid/website',{
                templateUrl: '../assignment/views/website/templates/website-list.view.client.html',
                controller: 'WebsiteListController',
                controllerAs: 'vm'
            })
            .when('/user/:uid/website/new',{
                templateUrl: '../assignment/views/website/templates/website-new.view.client.html',
                controller: 'NewWebsiteController',
                controllerAs: 'vm'
            })
            .when('/user/:uid/website/:wid',{
                templateUrl: '../assignment/views/website/templates/website-edit.view.client.html',
                controller: 'EditWebsiteController',
                controllerAs: 'vm'
            });
    }

}) ();