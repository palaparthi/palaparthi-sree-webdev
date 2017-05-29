/**
 * Created by Palaparthi on 5/22/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/user/:uid/website/:wid/page',{
                templateUrl: '../assignment/views/page/templates/page-list.view.client.html',
                controller: 'PageListController',
                controllerAs: 'vm'
            })
            .when('/user/:uid/website/:wid/page/new',{
                templateUrl: '../assignment/views/page/templates/page-new.view.client.html',
                controller: 'NewPageController',
                controllerAs: 'vm'
            })
            .when('/user/:uid/website/:wid/page/:pid',{
                templateUrl: '../assignment/views/page/templates/page-edit.view.client.html',
                controller: 'EditPageController',
                controllerAs: 'vm'
            });
    }

}) ();