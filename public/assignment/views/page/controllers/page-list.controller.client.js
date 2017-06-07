/**
 * Created by Palaparthi on 5/28/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('PageListController', PageListController);

    function PageListController(PageService,$routeParams) {
        var model = this;
        model.wid = $routeParams['wid'];
        model.uid = $routeParams['uid'];

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