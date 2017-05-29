/**
 * Created by Palaparthi on 5/26/17.
 */
(function () {

    angular
        .module('WebAppMaker')
        .controller('EditWebsiteController', EditWebsiteController)

    function EditWebsiteController(WebsiteService, $routeParams,$location) {
        var model = this;

        model.uid = $routeParams['uid'];
        model.wid = $routeParams['wid'];
        model.websites = WebsiteService.findWebsitesByUser(model.uid);

        model.website = WebsiteService.findWebsiteById(model.wid);

        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function deleteWebsite() {

            WebsiteService.deleteWebsite(model.wid);
            $location.url('/user/'+model.uid+'/website');

        }

        function updateWebsite(name, description) {

            var website = {
                _id: model.website._id,
                name: model.website.name,
                developerId: model.uid,
                description: model.website.description
            };

            WebsiteService.updateWebsite(model.wid, website);
            $location.url('/user/'+model.uid+'/website');

        }
    }
})();
