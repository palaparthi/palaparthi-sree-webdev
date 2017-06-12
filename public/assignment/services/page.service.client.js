/**
 * Created by Palaparthi on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .factory('PageService', PageService);

    function PageService($http) {

        var api ={
            createPage : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage :deletePage

        };
        return api;

        function createPage(websiteId, page) {
            var url = '/api/website/'+websiteId+'/page';
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                })

        }

        function findPageByWebsiteId(websiteId) {
            var url = '/api/website/'+websiteId+'/page';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findPageById(pageId){
           var url = '/api/page/'+pageId;
           return $http.get(url)
               .then(function (response) {
                   return response.data;
               })
        }

        function updatePage(pageId, page) {
            var url = '/api/page/'+pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                })

        }

        function deletePage(websiteId, pageId) {
            var url = '/api/website/'+websiteId+'/page/'+pageId;
           return $http.delete(url)
               .then(function (response) {
                   return response.data;
               })

        }


    }
})();
