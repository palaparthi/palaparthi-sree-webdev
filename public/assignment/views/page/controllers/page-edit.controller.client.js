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
        model.pages = PageService.findPageByWebsiteId(model.wid);
        model.page = PageService.findPageById(model.pid);
        
        model.deletePage=deletePage;
        model.editPage=editPage;
        
        function editPage() {
            var newPage={
                _id:model.page._id,
                name:model.page.name,
                description:model.page.description,
                websiteId:model.wid
            };
            PageService.updatePage(model.pid,newPage);
            $location.url('/user/'+model.uid+'/website/'+model.wid+'/page');
        }

        function deletePage() {
            PageService.deletePage(model.pid);
            $location.url('/user/'+model.uid+'/website/'+model.wid+'/page');
        }
    }
})();