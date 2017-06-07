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
            console.log('hi');
            var url1 = 'https://api.themoviedb.org/3/tv/1668?api_key=5a57d87cef01b95a12c3ca8862bf24f7';
            var url2 = 'https://api.trakt.tv/search/show?query=tron&trakt-api-key=8ffe7e12ccdefbb0864f59a0a49faae085121ca35c09b6eb663cd4072788e509&trakt-api-version=2&Content-Type=application/json;';
            $http.get(url2)
                .then(function (response) {
                    console.log(response.data);
                })
        }
    }
})();