/**
 * Created by Palaparthi on 5/28/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('PageListController', PageListController);

    function PageListController(PageService,$routeParams, currentUser) {
        var model = this;
        model.wid = $routeParams['wid'];
        //model.uid = $routeParams['uid'];
        model.uid=currentUser._id;

        function init() {
            PageService.findPageByWebsiteId(model.wid)
                .then(renderPage, errorPage);
        }

        init();

        function renderPage(page) {
            model.pages = page;
        }
        function errorPage(page) {
            model.message = "Error!";
        }
    }
})();