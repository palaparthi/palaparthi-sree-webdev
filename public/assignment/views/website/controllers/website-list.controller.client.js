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
        model.websites = WebsiteService.findWebsitesByUser(model.uid);

    }
})();
