/**
 * Created by Palaparthi on 5/28/17.
 */

(function () {
    angular
        .module('WebAppMaker')
        .controller('NewPageController', NewPageController)

    function NewPageController(PageService, $routeParams, $location) {
        var model = this;
        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];

        model.pages = PageService.findPageByWebsiteId(model.wid);
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
            PageService.createPage(model.wid,page);
            $location.url('/user/'+model.uid+'/website/'+model.wid+'/page');

        }
    }
})();
