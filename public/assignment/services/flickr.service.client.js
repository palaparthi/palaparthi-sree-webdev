/**
 * Created by Palaparthi on 6/4/17.
 */

(function() {
    angular
        .module('WebAppMaker')
        .service('FlickrService', FlickrService);

    function FlickrService($http) {

        this.searchPhotos = searchPhotos;

        var key = "7eeca4a497a76b5bc903d603c27c1f89";
        var secret = "a99872da8a4737c6";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
            function searchPhotos(searchText) {
                var url = urlBase.replace("API_KEY", key).replace("TEXT", searchText);
                return $http.get(url);
        }

    }
})();