/**
 * Created by Palaparthi on 5/28/17.
 */

(function () {
    angular
        .module('WebAppMaker')
        .controller('NewPageController', NewPageController);

    function NewPageController(PageService, $routeParams, $location, currentUser) {
        var model = this;
        //model.uid = $routeParams['uid'];
        model.uid=currentUser._id;
        model.wid = $routeParams['wid'];

        function init() {
            PageService.findPageByWebsiteId(model.wid)
                .then(renderPage, errorPage);
        }

        init();

        //event handlers
        model.newPage = newPage;

        function newPage(name,title){
            if(name === '' || name ===null || typeof name === 'undefined')
            {
                model.message="Please enter the Page name";
                return;
            }
            var page= {
                name:name,
                description: title
            };
            PageService.createPage(model.wid,page)
                .then(redirectPage, errorPage);

        }

        function renderPage(page) {
            model.pages = page;
        }

        function redirectPage(page){
            $location.url('/website/'+model.wid+'/page');
        }
        function errorPage(page) {
            model.message = "Error!";
        }
    }
})();
