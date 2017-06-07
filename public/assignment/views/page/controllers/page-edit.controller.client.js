/**
 * Created by Palaparthi on 5/28/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('EditPageController',EditPageController)
    
    function EditPageController(PageService, $routeParams, $location) {
        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.pid = $routeParams['pid'];

        //event handlers
        model.deletePage=deletePage;
        model.editPage=editPage;

        function init() {
            PageService.findPageByWebsiteId(model.wid)
                .then(renderPages, errorPage);
            PageService.findPageById(model.pid)
                .then(renderPage, errorPage);
        }

        init();

        function editPage() {
            var newPage={
                _id:model.page._id,
                name:model.page.name,
                description:model.page.description,
                websiteId:model.wid
            };
            PageService.updatePage(model.pid,newPage)
                .then(redirectPage, errorPage);

        }

        function deletePage() {
            PageService.deletePage(model.pid)
                .then(redirectPage,errorPage);
        }

        function renderPages(page) {
            model.pages = page;
        }
        function renderPage(page) {
            model.page = page;
        }
        function errorPage(page) {
            model.message = "Error!";
        }
        function redirectPage() {
            $location.url('/user/'+model.uid+'/website/'+model.wid+'/page');
        }
    }
})();