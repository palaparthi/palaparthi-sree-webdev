(function () {
    angular
        .module('TrendTv')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'SearchController',
                controllerAs: 'model'
            })
            .when('/search', {
                templateUrl: 'views/series/templates/search-results.view.client.html',
                controller: 'SearchController',
                controllerAs: 'model'})
            .when('/search/:seriesId/details', {
                templateUrl: 'views/series/templates/search-results-details.view.client.html',
                //controller: 'SearchDetailsController',
                //controllerAs: 'vm'});
            })
    }
}) ();
