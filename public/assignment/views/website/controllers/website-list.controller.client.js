/**
 * Created by Palaparthi on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', WebsiteListController)
    
    function WebsiteListController(WebsiteService,$routeParams) {
        var model = this;
        model.uid = $routeParams['uid'];
        //model.websites = WebsiteService.findWebsitesByUser(model.uid);
        WebsiteService.findWebsitesByUser(model.uid)
            .then(renderWebsite, errorWebsite);

        function renderWebsite(websites){
            model.websites = websites
        }


        function errorWebsite(website) {
            model.website = "Error!";
        }


    }
})();
