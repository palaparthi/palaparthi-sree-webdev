(function () {
    angular
        .module('TrendTv')
        .factory('SeriesService', SeriesService);

    function SeriesService($http) {

        var api ={
            searchSeries: searchSeries
        };

        return api;

        function searchSeries(searchText) {

        }
    }
})();