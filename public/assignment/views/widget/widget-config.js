/**
 * Created by Palaparthi on 5/22/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/user/:uid/website/:wid/page/:pid/widget',{
                templateUrl: '../assignment/views/widget/templates/widget-list.view.client.html',
                controller: 'WidgetListController',
                controllerAs: 'vm'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/new',{
                templateUrl: '../assignment/views/widget/templates/widget-chooser.view.client.html',
                controller: 'NewWidgetController',
                controllerAs: 'vm'
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/:wgid',{
                templateUrl: '../assignment/views/widget/templates/widget-edit.view.client.html',
                controller: 'EditWidgetController',
                controllerAs: 'vm'
            });
    }

}) ();