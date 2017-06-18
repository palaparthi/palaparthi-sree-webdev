/**
 * Created by Palaparthi on 5/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', WebsiteListController)
    
    function WebsiteListController(WebsiteService,$routeParams,currentUser) {
        var model = this;
        //model.uid = $routeParams['uid'];
        model.uid = currentUser._id;

        function init() {
            WebsiteService.findWebsitesByUser(model.uid)
                .then(renderWebsite, errorWebsite);
        }

        init();

        function renderWebsite(websites){
            model.websites = websites
        }


        function errorWebsite(website) {
            model.website = "Error!";
        }


    }
})();
