(function () {
    angular
        .module('TrendTv')
        .controller('SearchController', SearchController);
    
    function SearchController(SeriesService, $location) {

        var model = this;

        //event handler
        model.searchSeries = searchSeries;

        function searchSeries(searchText) {

            SeriesService.searchSeries(searchText);
        }

    }
    
})();